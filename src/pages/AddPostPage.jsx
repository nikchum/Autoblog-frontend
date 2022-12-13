import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getStatus } from 'redux/features/posts/postsSelectors';
import { createPost } from 'redux/features/posts/postsOperations';
import { removeStatus } from 'redux/features/posts/postsSlice';

import { Button } from 'components/Button';

export const AddPostPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const navigate = useNavigate();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
  });
  const image = watch('image');

  useEffect(() => {
    if (status) {
      if (status === 'Post created successfully') {
        toast.success(status);
        navigate('/');
        dispatch(removeStatus());
      } else {
        toast.error('Error, please try again');
      }
    }
  }, [dispatch, navigate, status]);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('image', data.image[0]);

    dispatch(createPost(formData));
  };

  errors.title && toast.info(errors.title?.message);
  errors.text && toast.info(errors.text?.message);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-m-60 mx-auto mt-10 flex max-w-[768px] flex-col gap-4 "
    >
      <h1 className=" text-center text-2xl font-medium  text-white">Create post</h1>

      <label className=" flex cursor-pointer items-center justify-center rounded-lg border-2 border-dotted bg-gray-600 py-2 text-xs text-gray-300 transition-opacity hover:opacity-80 focus:opacity-80">
        Attach an image
        <input {...register('image')} type="file" className="hidden" />
      </label>

      <div className="flex max-h-80  py-2">
        {!!image?.length && (
          <img src={URL.createObjectURL(image[0])} alt="poster" className="w-full object-cover" />
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
        <Button type={'submit'}>Add post</Button>
        <Button type={'submit'} onClick={() => reset()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
