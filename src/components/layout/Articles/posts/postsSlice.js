import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../apis/firestore/firebase-config';
import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';

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
      response.push(doc.data());
    });
    return response;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (posts, { getState }) => {
    try {
      const postsDoc = collection(db, 'Posts');
      await addDoc(postsDoc, {
        title: posts.title,
        body: JSON.stringify(posts.editor),
        category: posts.tags,
        author: getState().auth.currentUser.displayName,
        authorId: getState().auth.currentUser.uid,
        date: Timestamp.fromDate(new Date()),
      });
      console.log(posts);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, {payload}) => {
        state.push(...payload)
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
