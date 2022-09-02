import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-config';

export function signInWithEmail(creds){
    return (signInWithEmailAndPassword(auth, creds.email, creds.password)
    )

}

export function signOutFirebase() {
    return signOut(auth);
  }


  export function registerFirebase(creds){
    return (createUserWithEmailAndPassword(auth, creds.email, creds.password))
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