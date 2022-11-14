import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import reducers from './reducers';
import thunk from 'redux-thunk';
import { verifyAuth } from './actions/authActions';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './reducers/authReducer';
import asyncReducer from './reducers/asyncReducer';
import modalReducer from './reducers/modalReducer';
import postsReducer from './../components/layout/articles/postsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  modals: modalReducer,
  router: routerReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false,
    }),
  routerMiddleware: [routerMiddleware],
});

store.dispatch(verifyAuth());

export const history = createReduxHistory(store);
export const persistor = persistStore(store);
