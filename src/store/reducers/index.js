import { combineReducers } from "redux";
import authReducer from './authReducer';
import asyncReducer from "./asyncReducer";
// import modalReducer from "./modalReducer";


export default combineReducers({
   auth: authReducer,
   asynch: asyncReducer,
   // modals: modalReducer
});