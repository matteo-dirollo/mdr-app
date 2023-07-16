import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../../apis/firestore/firebase-config';
import { appLoaded, asyncActionError } from '../../store/asyncSlice';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseProviderUsersCollection } from '../../apis/firestore/firestoreService';

const initialState = {
  authenticated: false,
  currentUser: null,
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

// export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
//   try {
//     const listUsersResult = await adminConfig.auth().listUsers();
//     const users = listUsersResult.users;
//     // Process the list of users as needed
//     console.log(users);
//     return users;
//   } catch (error) {
//     console.log('Error fetching users:', error);
//     throw new Error('Failed to fetch users');
//   }
// });

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async userId => {
    try {
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      const user = userSnapshot.data();
      return user;
    } catch (error) {
      console.log('Failed to fetch user', error);
      throw new Error('Failed to fetch user');
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
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchUsers.fulfilled, (state, action) => {
      //   state.users = action.payload;
      // })
      // .addCase(fetchUsers.rejected, (state, action) => {
      //   // Handle the error if needed
      //   console.error('Error fetching users:', action.error.message);
      // })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const user = action.payload;
        state.users[user.id] = user; // Store the user data in the users object using the user ID as the key
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        // Handle the rejected case if needed
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
      });
  },
});

export const { signInUser, signOutUser, setLocation } = authSlice.actions;
export const getCurrentUserFromState = state => state.auth.currentUser;
export const getUsersFromState = state => state.auth.users;
export const getUserById = (state, userId) => state.auth.users[userId];

export default authSlice.reducer;
