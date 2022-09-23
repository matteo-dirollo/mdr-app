import { db } from './firebase-config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

import { Timestamp } from 'firebase/firestore';

export async function firebaseUsersCollection(values, user) {
  
  try {
    const docId = user.uid;
    const usersDoc = doc(db, 'users', docId );
    await setDoc( usersDoc, {
      displayName: values.name + " " + values.last,
      email: user.email,
      userId: user.uid,
      createdOn: user.metadata.creationTime
    });

  } catch (error) {
    console.log('Error adding document: ', error);
  }
}

export async function firebaseProviderUsersCollection(user) {
  // const docId = user.id;
  try {
    const docId = user.uid;
    const usersDoc = doc(db, 'users', docId );
    await setDoc( usersDoc, {
      displayName: user.displayName,
      email: user.email,
      userId: user.uid,
      createdOn: user.metadata.creationTime
    });

  } catch (error) {
    console.log('Error adding document: ', error);
  }
}

export async function firebaseUsersDoc(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc)=>{
    console.log(`${doc.id}=> ${doc.data()}`);
  })
}

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}
