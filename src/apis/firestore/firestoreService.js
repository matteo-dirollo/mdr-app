import { db } from './firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { Timestamp } from 'firebase/firestore';

export async function firebaseUsersCollection(user) {
  try {
    const usersDoc = await addDoc(collection(db, 'users'), {
      name: 'Name',
      last: 'surname',
      email: 'email',
      userId: 'userId',
      createdOn: 'createdOn'
    });
    console.log("Document written with ID: ", usersDoc.id);

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
