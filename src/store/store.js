import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import asyncReducer from './asyncSlice';
import modalReducer from '../components/layout/modal/modalSlice';
import postsReducer from '../components/layout/articles/posts/postsSlice';
import authReducer, { verifyAuth } from '../components/auth/authSlice';
import locationReducer from './locationSlice'; // Import the location reducer
import storageReducer from '../apis/storageSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ['posts', 'async', 'storage'],
};

const appReducers = combineReducers({
  async: asyncReducer,
  modals: modalReducer,
  posts: postsReducer,
  auth: authReducer,
  location: locationReducer,
  storage: storageReducer,
});

const _persistedReducer = persistReducer(persistConfig, appReducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

store.dispatch(verifyAuth());

export const persistor = persistStore(store);
