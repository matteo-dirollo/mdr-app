import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { verifyAuth } from './actions/authActions';

export function storeRoot() {
    const store = configureStore({ reducer: reducers, applyMiddleware: applyMiddleware(thunk) });

    store.dispatch(verifyAuth());

    return store
}