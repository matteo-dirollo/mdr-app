
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDocs, collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firestore/firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'reduxjs-toolkit-persist/lib/storage';
import { v4 } from 'uuid';
import _ from 'lodash';


export const apiSlice = createApi({
    reducerPath: 'posts',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Post'],
    endpoints: builder => ({
      fetchPosts: builder.query({
        async queryFn() {
          try {
            const response = [];
            const querySnapshot = await getDocs(collection(db, 'Posts'));
            querySnapshot.forEach(doc => {
              response.push({ id: doc.id, ...doc.data() });
            });
            return response;
          } catch (err) {
            return err.message;
          }
        },
        providesTags: ['Post'],
      }),
      // SINGLE ITEM FETCHING
      fetchSinglePost: builder.query({
        async queryFn(id) {
          try {
            const docRef = doc(db, 'Posts', id);
            const snapshot = await getDoc(docRef);
            return { data: snapshot.data() };
          } catch (err) {
            return err.message;
          }
        },
      }),
      addNewPost: builder.mutation({
        async queryFn(post, { getState }) {
          try {
            const imgRef = ref(storage, `Blog/covers/${post.img.name + v4()}`);
            await uploadBytes(imgRef, post.img);
            const imgUrl = await getDownloadURL(imgRef);
            const postId = _.kebabCase(post.title);
            const postsDoc = doc(db, 'Posts', postId);
            await setDoc(postsDoc, {
              title: post.title,
              imageUrl: imgUrl,
              body: JSON.stringify(post.editor),
              category: post.tags,
              author: getState().auth.currentUser.displayName,
              authorId: getState().auth.currentUser.uid,
              date: Timestamp.fromDate(new Date()),
            });
          } catch (err) {
            console.log('Error adding document: ', err);
          }
        },
      }),
    }),
  });