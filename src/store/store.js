import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import reducers from './reducers';
import thunk from 'redux-thunk';
import { verifyAuth } from './actions/authActions';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import authReducer from './reducers/authReducer';
import asyncReducer from './reducers/asyncReducer';
import modalReducer from './reducers/modalReducer';


const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ 
    history: createBrowserHistory(),
   });

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    asynch: asyncReducer,
    modals: modalReducer,
    router: routerReducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk,
      serializableCheck: false,
    }),
  routerMiddleware: [routerMiddleware],
});

store.dispatch(verifyAuth());

export const history = createReduxHistory(store);
