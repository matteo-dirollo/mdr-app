import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../apis/firestore/firebase-config';
// import { APP_LOADED } from '../../store/reducers/asyncReducer';
import { appLoaded, asyncActionError } from '../../store/asyncSlice';



const initialState = {
  authenticated: false,
  currentUser: null,
  currentLocation: null,
};

export const verifyAuth = createAsyncThunk('users/verifyAuth', async (_, { dispatch }) => {
  try {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(usersSlice.actions.signInUser(user));
          dispatch(appLoaded());
        } else {
          dispatch(usersSlice.actions.signOutUser());
          dispatch(appLoaded());
        }
        resolve();
      });
    });
  } catch (error) {
    console.error('Error verifying authentication:', error);
    dispatch(asyncActionError(error.message));
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      const { email, photoURL, uid, displayName, providerData } = action.payload;
      state.authenticated = true;
      state.currentUser = {
        email,
        photoURL,
        uid,
        displayName,
        providerId: providerData[0]?.providerId,
      };
    },
    signOutUser: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
    setLocation: (state, action) => {
      state.prevLocation = state.currentLocation;
      state.currentLocation = action.payload;
    },
  },
});

export const { signInUser, signOutUser, setLocation } = usersSlice.actions;

export default usersSlice.reducer;
