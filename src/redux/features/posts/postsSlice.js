import { createSlice } from '@reduxjs/toolkit';
import { createPost, getAllPosts, removePost } from './postsOperations';

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removeStatus(state) {
      state.status = null;
    },
  },
  extraReducers: {
    [createPost.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.posts = [payload.newPostWithImage, ...state.posts];
      state.status = payload.message;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [getAllPosts.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload.posts;
      state.popularPosts = payload.popular;
    },
    [getAllPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [removePost.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [removePost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.posts = state.posts.filter(post => post._id !== payload._id);
      state.status = payload.message;
    },
    [removePost.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
  },
});

export const { removeStatus } = postSlice.actions;
export const postsReducer = postSlice.reducer;
