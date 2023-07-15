import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../apis/firestore/firebase-config';
import { appLoaded, asyncActionError } from '../../store/asyncSlice';



const initialState = {
  authenticated: false,
  currentUser: null,
  currentLocation: null,
};

export const verifyAuth = createAsyncThunk('auth/verifyAuth', async (_, { dispatch }) => {
  try {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(authSlice.actions.signInUser(user));
          dispatch(appLoaded());
        } else {
          dispatch(authSlice.actions.signOutUser());
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

export const signInWithEmail = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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

export const { signInUser, signOutUser, setLocation } = authSlice.actions;
export const getCurrentUserFromState = state => auth.currentUser;

export default authSlice.reducer;
