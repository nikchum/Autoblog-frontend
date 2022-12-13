import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';

import { getUser } from 'redux/features/auth/authSelectors';
import { createComment, getPostComments } from 'redux/features/comments/commentsOperations';
import { removePost } from 'redux/features/posts/postsOperations';
import { getStatus } from 'redux/features/posts/postsSelectors';
import { getComments, getStatusComment } from 'redux/features/comments/commentsSelectors';
import { removeStatus } from 'redux/features/posts/postsSlice';

import { Button } from 'components/Button';
import { CommentItem } from 'components/CommentItem';
import { removeStatusComments } from 'redux/features/comments/commentsSlice';

import axios from '../utils/axios';
import { path } from 'utils/API';
import { Loader } from 'components/Loader';

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const params = useParams();
  const user = useSelector(getUser);
  const status = useSelector(getStatus);
  const comments = useSelector(getComments);
  const statusComment = useSelector(getStatusComment);
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
    if (statusComment === 'Comment added') {
      setComment('');
      toast.success(statusComment);
      dispatch(removeStatusComments());
    }
  }, [dispatch, navigate, status, statusComment]);

  const removePostHandler = async () => {
    await dispatch(removePost(params.id));
    dispatch(removeStatus());
  };

  const fetchPost = useCallback(async () => {
    try {
      setisLoading(true);
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    dispatch(getPostComments(params.id));
  }, [dispatch, params.id]);

  console.log(user);

  const handleSubmitComment = () => {
    if (!user._id) {
      toast.error('Comments can be posted only by registered users');
      return;
    }

    if (comment.trim()) {
      dispatch(createComment({ postId: params.id, comment }));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <Link
        to={'/'}
        className="justify-centeri inline-flex items-center rounded-[4px] bg-gray-600 py-2 px-4 text-xs text-white transition-opacity hover:opacity-80"
      >
        Back
      </Link>

      <div className="flex gap-6 py-8">
        <div className="h-fit w-2/3 rounded-[8px] bg-gray-700 shadow-lg">
          <div className="flex flex-grow basis-1/4 flex-col ">
            <div className={post?.imgUrl ? 'flex h-80 rounded-sm' : 'flex rounded-sm'}>
              {post?.imgUrl && (
                <img src={`${path}/${post.imgUrl}`} alt="img" className="w-full object-cover" />
              )}
            </div>
            <div className="flex items-center justify-between px-3 pt-2">
              <p className="text-xs text-white opacity-60">Author: {post?.username}</p>
              <div className="text-xs text-white opacity-50">
                <Moment date={post?.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <h1 className="px-3 pt-2 text-2xl text-white ">{post?.title}</h1>
            <p className="px-3 pt-1 text-sm text-white opacity-80">{post?.text}</p>
            <div className="flex items-center justify-between gap-3">
              <div className="mt-4 flex gap-3 px-3 pb-1">
                <div className="flex items-center justify-between gap-2 text-sm  text-white opacity-90">
                  <AiFillEye />
                  <span>{post?.views}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm text-white opacity-90">
                  <AiOutlineMessage />
                  <span>{post?.comments?.length}</span>
                </div>
              </div>

              {user?._id === post?.author && (
                <div className="mt-4 flex gap-3 pb-2 pr-2">
                  <Link
                    to={`/posts/${params.id}/edit`}
                    className="flex items-center justify-between gap-2 text-2xl text-white opacity-70 "
                  >
                    <AiTwotoneEdit className="transition-all hover:fill-slate-900" />
                  </Link>
                  <button
                    onClick={removePostHandler}
                    type="button"
                    className="flex items-center justify-between gap-2  text-2xl text-white opacity-70"
                  >
                    <AiFillDelete className="transition-all hover:fill-slate-900" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-fit w-1/3 flex-col gap-6 rounded-lg bg-gray-700 p-8 shadow-lg ">
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              onChange={e => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="Comment"
              className="twxt-xs w-full rounded-sm border bg-gray-400 p-2 text-black outline-none placeholder:text-gray-700 focus:border-green-600 focus:bg-white"
            />
            <Button type={'submit'} onClick={handleSubmitComment} textColor={'text-white'}>
              Send
            </Button>
          </form>
          <ul className="flex flex-col gap-2">
            {comments?.map(comment => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
