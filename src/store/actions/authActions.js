import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import { signInWithEmail } from '../../apis/firestore/firebaseService';
import { onAuthStateChanged } from 'firebase/auth';
import { APP_LOADED } from '../reducers/asyncReducer';

export function signInUser(user) {
  return async function (dispatch) {
    try {
        const result = await signInWithEmail(user);
        dispatch({type: SIGN_IN_USER, payload: result.user })
    } catch (error) {
        const errorCode = error.code;
      const errorMessage = error.message;
      console.log('An error occured: ', errorCode, errorMessage);
    }
  };
}

export function verifyAuth() {
    return function (dispatch) {
      return onAuthStateChanged((user) => {
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