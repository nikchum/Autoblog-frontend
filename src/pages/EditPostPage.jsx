import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getStatus } from 'redux/features/posts/postsSelectors';
import { updatePost } from 'redux/features/posts/postsOperations';

import { Button } from 'components/Button';
import { removeStatus } from 'redux/features/posts/postsSlice';

import axios from '../utils/axios';
import { path } from 'utils/API';

export const EditPostPage = () => {
  const [oldImg, setOldImg] = useState('');

  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const newImage = watch('image');

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setValue('title', data.title);
      setValue('text', data.text);
      setOldImg(data.imgUrl);
    } catch (error) {
      console.log(error);
    }
  }, [params.id, setValue]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    if (status) {
      if (status === 'Post updated successfully') {
        toast.success(status);
        navigate('/posts');
        dispatch(removeStatus());
      } else {
        toast.error('Error, please try again');
      }
    }
  }, [dispatch, navigate, status]);

  const onSubmit = data => {
    const updatedPost = new FormData();
    updatedPost.append('title', data.title);
    updatedPost.append('text', data.text);
    updatedPost.append('image', data.image[0]);

    dispatch(updatePost({ id: params.id, updatedPost }));
  };

  errors.title && toast.info(errors.title?.message);
  errors.text && toast.info(errors.text?.message);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex h-60 w-2/3 flex-col gap-4"
    >
      <h1 className=" text-center text-2xl font-medium  text-white">Create post</h1>

      <label className=" flex cursor-pointer items-center justify-center rounded-lg border-2 border-dotted bg-gray-600 py-2 text-xs text-gray-300 transition-opacity hover:opacity-80 focus:opacity-80">
        Attach an image
        <input {...register('image')} type="file" className="hidden" />
      </label>

      <div className="flex h-80 py-2">
        {oldImg && !newImage?.length && (
          <img src={`${path}/${oldImg}`} alt="poster" className="w-full object-cover" />
        )}
        {!!newImage?.length && (
          <img
            src={URL.createObjectURL(newImage[0])}
            alt="poster"
            className="w-full object-cover"
          />
        )}
      </div>

      <label className=" text-xs">
        <input
          {...register('title', {
            required: 'Fill in the field title',
          })}
          type="text"
          placeholder="Title"
          className="mt-1 w-full rounded-lg border bg-gray-200 py-2 px-2 text-xs text-black outline-none placeholder:text-gray-400 focus:border-green-600 focus:bg-white"
        />
      </label>

      <label className=" text-xs">
        <textarea
          {...register('text', {
            required: 'Fill in the field text',
          })}
          placeholder="Text post"
          className="mt-1 h-60 w-full resize-none overflow-auto rounded-lg border bg-gray-200 py-2 px-2 text-xs text-black outline-none placeholder:text-gray-400 focus:border-green-600 focus:bg-white"
        />
      </label>

      <div className="flex justify-center gap-8 ">
        <Button type={'submit'}>Update post</Button>
        <Button type={'submit'} onClick={() => reset()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
