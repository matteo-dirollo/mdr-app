import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import asyncReducer from './asyncSlice';
import modalReducer from '../components/layout/modal/modalSlice';
import postsReducer from '../components/layout/articles/posts/postsSlice';
import authReducer, { verifyAuth } from '../components/auth/authSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ['posts', 'router'],
};

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const appReducers = combineReducers({
  async: asyncReducer,
  modals: modalReducer,
  router: routerReducer,
  posts: postsReducer,
  auth: authReducer,
});

const _persistedReducer = persistReducer(persistConfig, appReducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  routerMiddleware: [routerMiddleware],
  devTools: true,
});

store.dispatch(verifyAuth());

export const history = createReduxHistory(store);
export const persistor = persistStore(store);
