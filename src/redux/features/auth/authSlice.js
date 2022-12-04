import { createSlice } from '@reduxjs/toolkit';
import { register, login, getCurrent, logout } from './authOperations';

const initialState = {
  user: {
    username: null,
    email: null,
    posts: [],
  },
  token: null,
  isLoading: false,
  status: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeStatus(state) {
      state.status = null;
    },
  },
  extraReducers: {
    [register.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.token = payload.token;
      state.status = payload.message;
    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [login.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.token = payload.token;
      state.status = payload.message;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [getCurrent.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [getCurrent.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.token = payload.token;
    },
    [getCurrent.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },

    [logout.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user.username = null;
      state.user.email = null;
      state.token = null;
      state.status = payload.message;
    },
    [logout.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
  },
});

export const { removeStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
