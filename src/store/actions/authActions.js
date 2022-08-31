import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../apis/firestore/firebase-config';
import { APP_LOADED } from '../reducers/asyncReducer';

export function signInUser(creds) {
  return async function (dispatch) {
    try {
        const result = await signInWithEmailAndPassword(auth, creds.email, creds.password);
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
      return onAuthStateChanged(auth,(user) => {
        if (user) {
          dispatch(signInUser(user));
          dispatch({ type: APP_LOADED });
        //   const uid = user.uid;
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