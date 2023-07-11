import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from './firestore/firebase-config'; // Import your initialized Firebase storage instance
import { getDownloadURL, listAll, ref } from 'firebase/storage';

export const fetchObject = createAsyncThunk(
  'storage/fetchObject',
  async objectId => {
    const objectRef = storage.ref().child(objectId);
    const downloadURL = await objectRef.getDownloadURL();
    return { objectId, downloadURL };
  }
);

export const fetchObjects = createAsyncThunk(
  'storage/fetchObjects',
  async () => {
    try {
      const listRef = ref(storage, 'Videos');
      const objectsSnapshot = await listAll(listRef);

      const downloadURLs = await Promise.all(
        objectsSnapshot.items.map(async item => {
          const objectRef = ref(storage, item.fullPath);
          const downloadURL = await getDownloadURL(objectRef);
          const { path_ } = item._location;
          const objectId = path_.substring(path_.lastIndexOf('/') + 1);
          return { objectId, downloadURL };
        })
      );

      return downloadURLs;
    } catch (error) {
      throw error;
    }
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
  extraReducers: builder => {
    builder
      .addCase(fetchObject.pending, state => {
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
      .addCase(fetchObjects.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.objectData = action.payload.reduce((data, item) => {
            data[item.objectId] = item.downloadURL;
            return data;
          }, {});
        } else {
          state.error = 'Invalid payload format';
        }
      })

      .addCase(fetchObjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: storageReducer } = storageSlice;

export const selectLoading = state => state.storage.loading;
export const selectObjectData = state => state.storage.objectData;

export const selectError = state => state.storage.error;

export default storageReducer;
