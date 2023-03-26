import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../../../../apis/firestore/firebase-config';
import {
  collection,
  getDocs,
  Timestamp,
  setDoc,
  doc
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import _ from 'lodash';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeeded' | 'failed'
  error: null,
};



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
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
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (post, { getState }) => {
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
    } catch (error) {
      console.log('Error adding document: ', error);
    }
    console.log(JSON.stringify(post.editor))
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, { payload }) => {
      state.push(...payload);
    },
    clearBlog: state => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // let min = 1;
        // const loadedPosts = action.payload.map(post => {
        //   post.date = sub(new Date(), { minutes: min++ }).toISOString();
        //   return post;
        // });
        // state.posts = state.posts.concat(loadedPosts);
        state.posts.push(...action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        // const sortedPosts = state.posts.sort((a, b) => {
        //   if (a.id > b.id) return 1;
        //   if (a.id < b.id) return -1;
        //   return 0;
        // });
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // // End fix for fake API post IDs
        // console.log(state);
        // state.posts.push(...action.payload)
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const { postAdded, clearBlog } = postsSlice.actions;

export default postsSlice.reducer;
