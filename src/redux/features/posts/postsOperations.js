import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createPost = createAsyncThunk('posts/createPost', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('/posts', params);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/posts');

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const removePost = createAsyncThunk('posts/removePost', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
