import { createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments } from './commentsOperations';

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    removeStatusComments(state) {
      state.status = null;
    },
  },
  extraReducers: {
    [createComment.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = [...state.comments, payload.result];
      state.status = payload.message;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [getPostComments.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [getPostComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.comments = payload;
    },
    [getPostComments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
  },
});

export const { removeStatusComments } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
