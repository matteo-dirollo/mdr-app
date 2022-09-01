import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { APP_ID, AUTH_DOMAIN, FIREBASE_API_KEY, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "../constantsApiKeys";




const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const googleAuthProvider = new GoogleAuthProvider(app);
// const facebookAuthProvider = new FacebookAuthProvider(app);


export { db, auth  };

// DATA FROM SNAPSHOT

// export function dataFromSNapshot(snapshot){
//   if (!snapshot.exists) return undefined;
//   const data = snapshot.data();

//   for (const prop in data) {
//     if (data.hasOwnProperty(prop)) {
//       if (data[prop] instanceof db.TimeStamp) {
//         data[prop] = data[prop].toDate()
//       }
//     }
//   }
//   return {
//     ...data,
//     id: snapshot.id
//   }
// }