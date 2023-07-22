import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../apis/firestore/firebase-config';
import { appLoaded, asyncActionError } from '../../store/asyncSlice';
import { firebaseProviderUsersCollection } from '../../apis/firestore/firestoreService';

const initialState = {
  authenticated: false,
  currentUser: null,
  users: {},
};

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { dispatch }) => {
    try {
      return new Promise(resolve => {
        onAuthStateChanged(auth, user => {
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
  }
);

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

export const socialLogin = createAsyncThunk(
  'auth/socialLogin',
  async selectedProvider => {
    let provider;
    if (selectedProvider === 'facebook') {
      provider = new FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
      provider = new GoogleAuthProvider();
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);
      signInUser(user);
      if (isNewUser === true) {
        firebaseProviderUsersCollection(user);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const signOutFirebase = createAsyncThunk(
  'auth/signOutFirebase',
  async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_URL}/users`
    ); // Replace with your Cloud Function URL
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();

    const usersObject = users.reduce((acc, user) => {
      acc[user.uid] = user;

      return acc;
    }, {});
    return usersObject;
  } catch (error) {
    console.log('Error fetching users:', error);
    throw error;
  }
});

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (userId, { getState, dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_URL}/users/${userId}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log('Error response:', errorResponse);
        throw new Error('Failed to fetch user');
      }
      const user = await response.json();

      // Dispatch the user data to the state
      dispatch(authSlice.actions.setUser(user));
    } catch (error) {
      console.log('Failed to fetch user:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser: (state, action) => {
      const { email, photoURL, uid, displayName, providerData } =
        action.payload;
      state.authenticated = true;
      state.currentUser = {
        email,
        photoURL,
        uid,
        displayName,
        providerId: providerData[0]?.providerId,
      };
    },
    signOutUser: state => {
      state.authenticated = false;
      state.currentUser = null;
    },
    setLocation: (state, action) => {
      state.prevLocation = state.currentLocation;
      state.currentLocation = action.payload;
    },
    setUser: (state, action) => {
      state.users[action.payload.id] = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error fetching users:', action.error.message);
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const user = action.payload;
        console.log('User object:', user);
        state.users[user.uid] = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          metadata: user.metadata,
        };
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Failed to fetch user:', action.error);
      })
      // Add the following case to handle when setUser is called without fetching users first
      .addCase(authSlice.actions.setUser, (state, action) => {
        const user = action.payload;
        state.users[user.uid] = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          providerData: user.providerData,
          metadata: user.metadata,
        };
      })
      .addCase(socialLogin.pending, (state, action) => {
        // Update the status to 'loading'
        state.status = 'loading';
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        // Update the status to 'succeeded' and update the state with the user data
        state.status = 'succeeded';
        state.authenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        // Update the status to 'failed' and set the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signOutFirebase.fulfilled, state => {
        state.authenticated = false;
        state.currentUser = null;
      })
      .addCase(signOutFirebase.rejected, (state, action) => {
        // Handle the rejected case if needed
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { signInUser, signOutUser, setLocation } = authSlice.actions;
export const getAuthentication = state => auth.authenticated;
export const getCurrentUserFromState = state => auth.currentUser;
export const getUsersFromState = state => state.auth.users;
export const getUserById = (state, userId) => state.auth.users[userId];

export default authSlice.reducer;
