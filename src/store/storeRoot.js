import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { verifyAuth } from './actions/authActions';

export function storeRoot() {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false,
    }),
  });

  store.dispatch(verifyAuth());

  return store;
}
