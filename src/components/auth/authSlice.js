import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../apis/firestore/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const initialState = {
  authenticated: false,
  currentUser: null,
  currentLocation: null,
};

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
    signInUser(state, action) {
      state.push({
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          photoUrl: action.payload.photoURL,
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          providerId: action.payload.providerData[0].providerId,
        },
      });
    },
    signOutUser(state) {
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    },
  },
});

export default authSlice.reducer;
