import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getCurrent } from 'redux/features/auth/authOperations';

import { Layout } from './Layout';
import { MainPage } from 'pages/MainPage';
import { PostsPage } from 'pages/PostsPage';
import { PostPage } from 'pages/PostPage';
import { AddPostPage } from 'pages/AddPostPage';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { EditPostPage } from 'pages/EditPostPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrent());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index exact element={<MainPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/:id/edit" element={<EditPostPage />} />
          <Route path="posts/new" element={<AddPostPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
