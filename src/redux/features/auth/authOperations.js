import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);

    if (data.token) {
      localStorage.setItem('token', `Bearer ${data.token}`);
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);

    if (data.token) {
      localStorage.setItem('token', `Bearer ${data.token}`);
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getCurrent = createAsyncThunk('auth/getCurrent', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/current', credentials);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.get('/auth/logout', credentials);

    localStorage.removeItem('token');

    return data;
  } catch (error) {
    console.log('Error Logout');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
