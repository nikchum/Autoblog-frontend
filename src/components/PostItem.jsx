import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
  return (
    <li className="flex flex-grow basis-1/4 flex-col">
      <Link to={`/${post._id}`}>
        <div className={post.imgUrl ? 'flex h-80 rounded-sm' : 'flex rounded-sm'}>
          {post.imgUrl && (
            <img
              src={`http://localhost:3002/${post.imgUrl}`}
              alt="img"
              className="w-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-white opacity-50">{post.username}</div>
          <div className="text-xs text-white opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <h2 className="text-xl text-white">{post.title}</h2>
        <p className="pt-4 text-xs text-white opacity-60 line-clamp-4">{post.text}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-between gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comments?.length}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
