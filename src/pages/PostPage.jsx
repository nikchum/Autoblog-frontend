import React, { useCallback, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from 'redux/features/auth/authSelectors';
import { removePost } from 'redux/features/posts/postsOperations';
import { getStatus } from 'redux/features/posts/postsSelector';
import axios from '../utils/axios';

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const user = useSelector(getUser);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      if (status === 'Post deleted') {
        toast.success(status);
        navigate('/posts');
      } else {
        toast.error('Error, please try again');
      }
    }
  }, [status]);

  const removePostHandler = () => {
    dispatch(removePost(params.id));
  };

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div>
      <Link
        to={'/'}
        className="justify-centeri inline-flex items-center rounded-sm bg-gray-600 py-2 px-4 text-xs text-white"
      >
        Back
      </Link>

      <div className="flex gap-10 py-8">
        <div className="w-2/3 ">
          <div className="flex flex-grow basis-1/4 flex-col">
            <div className={post?.imgUrl ? 'flex h-80 rounded-sm' : 'flex rounded-sm'}>
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="w-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-white opacity-50">{post?.username}</div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post?.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <h2 className="text-xl text-white">{post?.title}</h2>
            <p className="pt-4 text-xs text-white opacity-60">{post?.text}</p>
            <div className="flex items-center justify-between gap-3">
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="flex items-center justify-between gap-2  text-white opacity-50"
                >
                  <AiFillEye />
                  <span>{post?.views}</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-between gap-2  text-white opacity-50"
                >
                  <AiOutlineMessage />
                  <span>{post?.comments?.length}</span>
                </button>
              </div>

              {user?._id === post?.author && (
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-between gap-2 text-2xl text-white opacity-50"
                  >
                    <AiTwotoneEdit className="hover:fill-slate-900" />
                  </button>
                  <button
                    onClick={removePostHandler}
                    type="button"
                    className="flex items-center justify-between gap-2  text-2xl text-white opacity-50"
                  >
                    <AiFillDelete className="hover:fill-slate-900" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 ">Comments</div>
      </div>
    </div>
  );
};
