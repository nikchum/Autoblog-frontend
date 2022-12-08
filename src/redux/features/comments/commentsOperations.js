import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, { comment });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
