import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { signInUser } from '../../store/actions/authActions';
import { auth } from './firebase-config';
import { firebaseProviderUsersCollection } from './firestoreService';
// import { firebaseUsersDoc } from './firestoreService';
// import { setUserProfileData } from './firestoreService';

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map(e =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
}

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

export async function registerFirebase(creds) {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    await updateProfile(result.user, {
      displayName: creds.displayName,
    });
    // return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook') {
    provider = new FacebookAuthProvider();
  }
  if (selectedProvider === 'google') {
    provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { isNewUser } = getAdditionalUserInfo(result);
    signInUser(user);
    if (isNewUser === true) {
      firebaseProviderUsersCollection(user)
    }
  } catch (error) {
    throw error;
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
