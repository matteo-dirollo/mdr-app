import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

export function signInWithEmail(creds) {
    return (
      signInWithEmailAndPassword(auth, creds.email, creds.password))
     
}