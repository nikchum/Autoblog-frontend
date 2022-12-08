import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/auth/authSlice';
import { commentsReducer } from './features/comments/commentsSlice';
import { postsReducer } from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
