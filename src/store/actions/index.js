import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import { auth } from '../../apis/firestore/firebase-config';
import { APP_LOADED } from '../reducers/asyncReducer'

export function signInUser(user) {
    return {
      type: SIGN_IN_USER,
      payload: user
    };
  }

export function verifyAuth() {
  return function (dispatch) {
    return auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}