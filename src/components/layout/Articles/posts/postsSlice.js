import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../../../../apis/firestore/firebase-config';
import {
  collection,
  getDocs,
  Timestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import _ from 'lodash';
import { getCurrentUserFromState } from '../../../auth/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

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
    // console.log(JSON.stringify(post.editor));
  }
);

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
  try {
    const postDoc = doc(db, 'Posts', postId);
    await deleteDoc(postDoc);
    return postId;
  } catch (error) {
    console.log('Error deleting document: ', error);
  }
});

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, comment }) => {
    // Save the comment to Firestore
    try {
      const commentId = uuidv4();
      const postsDoc = doc(db, 'Posts', postId);
      const currentUser = getCurrentUserFromState();
      const timestamp = Timestamp.now();
      await updateDoc(postsDoc, {
        [`comments.${commentId}`]: {
          postId,
          comment,
          uid: currentUser.uid,
          timestamp
        },
      });
      return { postId, comment };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, commentId }) => {
    try {
      const postsDoc = doc(db, 'Posts', postId);
      await updateDoc(postsDoc, {
        [`comments.${commentId}`]: null,
      });
      return { postId, commentId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const modifyComment = createAsyncThunk(
  'posts/modifyComment',
  async ({ postId, commentId, newComment }) => {
    // Update the comment in Firestore
    try {
      const commentDoc = doc(db, 'Comments', commentId);
      await updateDoc(commentDoc, { comment: newComment });

      return { postId, commentId, newComment };
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async postId => {
    try {
      const postsDoc = doc(db, 'Posts', postId);
      const docSnapshot = await getDoc(postsDoc);
      const post = { id: docSnapshot.id, ...docSnapshot.data() };
      const comments = Object.values(post.comments || {});
      return comments;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, { payload }) => {
      state.posts.push({ ...payload, comments: [] });
    },
    postDeleted: (state, { payload }) => {
      state.posts = state.posts.filter(post => post.id !== payload);
    },
    clearBlog: state => {
      return initialState;
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const currentUser = getCurrentUserFromState(); // Retrieve the currentUser object from the state
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.reactions.push({ user: currentUser, reaction });
      }
    },
    commentAdded: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        if (!post.comments) {
          post.comments = []; // Initialize the comments array if it doesn't exist
        } else {
          post.comments.push(comment);
        }
      }
    },
    commentDeleted: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments = post.comments.filter(
          comment => comment.id !== commentId
        );
      }
    },

    commentModified: (state, action) => {
      const { postId, commentId, newComment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const comment = post.comments.find(comment => comment.id === commentId);
        if (comment) {
          comment.comment = newComment;
        }
      }
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
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
      })
      // Fetch Comments
      .addCase(fetchComments.pending, (state, action) => {
        // Update the status to 'loading'
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const comments = action.payload; // The payload is an array of comments
        state.posts.forEach(post => {
          if (post.comments) {
            post.comments = comments.filter(
              comment => comment.postId === post.id
            );
          }
        });
      })

      .addCase(fetchComments.rejected, (state, action) => {
        // Update the status to 'failed' and set the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Comment
      .addCase(addComment.pending, (state, action) => {
        // Update the status to 'loading'
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { comment } = action.payload;
        const { articleId } = useParams();
        const post = _.find(state.posts, { id: articleId });
        if (post) {
          if (!post.comments) {
            post.comments = []; // Initialize the comments array if it doesn't exist
          }
          post.comments.push(comment);
        }
      })

      .addCase(addComment.rejected, (state, action) => {
        // Update the status to 'failed' and set the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Comment
      .addCase(deleteComment.pending, (state, action) => {
        // Update the status to 'loading'
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        // Update the status to 'succeeded' and remove the deleted comment from the state
        state.status = 'succeeded';
        const { postId, commentId } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          post.comments = post.comments.filter(
            comment => comment.id !== commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        // Update the status to 'failed' and set the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Modify Comment
      .addCase(modifyComment.pending, (state, action) => {
        // Update the status to 'loading'
        state.status = 'loading';
      })
      .addCase(modifyComment.fulfilled, (state, action) => {
        // Update the status to 'succeeded' and update the comment in the state
        state.status = 'succeeded';
        const { postId, commentId, newComment } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          const comment = post.comments.find(
            comment => comment.id === commentId
          );
          if (comment) {
            comment.comment = newComment;
          }
        }
      })
      .addCase(modifyComment.rejected, (state, action) => {
        // Update the status to 'failed' and set the error message
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const selectCommentsByPostId = (state, postId) =>
  state.posts.comments.filter(comment => comment.postId === postId);

export const {
  postAdded,
  postDeleted,
  clearBlog,
  reactionAdded,
  commentAdded,
} = postsSlice.actions;

export default postsSlice.reducer;
