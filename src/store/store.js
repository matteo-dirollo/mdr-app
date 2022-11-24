import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { verifyAuth } from './actions/authActions';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import { createRouterMiddleware, createRouterReducerMapObject, push, ReduxRouter } from '@lagunovsky/redux-react-router';
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router'
import { NavLink } from 'react-router-dom'

import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import authReducer from './reducers/authReducer';
import asyncReducer from './reducers/asyncReducer';
import modalReducer from './reducers/modalReducer';
import postsReducer from '../components/layout/articles/posts/postsSlice';
import usersReducer from '../components/auth/usersSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ['posts', 'router']
};

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const appReducers = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  modals: modalReducer,
  router: routerReducer,
  posts: postsReducer,
  users: usersReducer,
});

const _persistedReducer = persistReducer(persistConfig, appReducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  routerMiddleware: [routerMiddleware],
});

store.dispatch(verifyAuth());

export const history = createReduxHistory(store);
export const persistor = persistStore(store);
