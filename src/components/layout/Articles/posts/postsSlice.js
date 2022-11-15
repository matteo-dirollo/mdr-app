import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../apis/firestore/firebase-config';
import { sub } from 'date-fns';
import axios from 'axios';
import { addDoc, collection, setDoc } from 'firebase/firestore';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async posts => {
  try {
    const postsDoc = collection(db, 'Posts');
    await addDoc(postsDoc, {
      title: posts.title,
      body: JSON.stringify(posts.editor),
      category: posts.tags
    });
    console.log(posts);
  } catch (error) {
    console.log('Error adding document: ', error);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
          },
        };
      },
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
        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs
        action.payload.date = new Date().toISOString();

        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const { postAdded, clearBlog } = postsSlice.actions;

export default postsSlice.reducer;
