import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from './firestore/firebase-config'; // Import your initialized Firebase storage instance

export const fetchObject = createAsyncThunk(
    'storage/fetchObject',
    async (objectId) => {
      const objectRef = storage.ref().child(objectId);
      const downloadURL = await objectRef.getDownloadURL();
      return { objectId, downloadURL };
    }
  );

  export const fetchObjects = createAsyncThunk(
    'storage/fetchObjects',
    async () => {
      const storageRef = storage.ref();
      const objectsSnapshot = await storageRef.listAll();
  
      const objects = await Promise.all(
        objectsSnapshot.items.map(async (objectRef) => {
          const downloadURL = await objectRef.getDownloadURL();
          return { objectId: objectRef.name, downloadURL };
        })
      );
  
      return objects;
    }
  );
  
  const storageSlice = createSlice({
    name: 'storage',
    initialState: {
      loading: false,
      objectData: {},
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchObject.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchObject.fulfilled, (state, action) => {
          state.loading = false;
          state.objectData[action.payload.objectId] = action.payload.downloadURL;
        })
        .addCase(fetchObject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchObjects.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchObjects.fulfilled, (state, action) => {
            state.loading = false;
            state.objectData = action.payload.reduce((data, object) => {
              data[object.objectId] = object.downloadURL;
              return data;
            }, {});
          })
          .addCase(fetchObjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    },
  });

  export const { reducer: storageReducer } = storageSlice;

export const selectLoading = (state) => state.storage.loading;
export const selectObjectData = (state) => state.storage.objectData;
export const selectError = (state) => state.storage.error;

export default storageReducer;

  