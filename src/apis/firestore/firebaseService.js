import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './firebase-config';

export function signInWithEmail(creds) {
  try {
    signInWithEmailAndPassword(auth, creds.email, creds.password);
  } catch (error) {
    throw error;
  }
}

export function signOutFirebase() {
  return signOut(auth);
}

export function registerFirebase(creds) {
  try {
    createUserWithEmailAndPassword(auth, creds.email, creds.password);
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook') {
    provider = new FacebookAuthProvider();
  }
  if (selectedProvider === 'google'){
    provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log(user);
    if (user.additionalUserInfo.isNewUser) {
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;

      // await setProfileData(result.user)
    }
  } catch (error) {
    console.log(error)
  }
}

//   export async function registerFirebase(creds){
//     try {
//         const result = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
//         await result.user.updateProfile({
//             displayName: creds.displayName,
//         })
//         return await setUserProfileData(result.user)
//     } catch (error){
//         throw error;
//     }

// }
