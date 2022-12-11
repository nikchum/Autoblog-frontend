import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { path } from 'utils/API';

export const PostItem = ({ post }) => {
  console.log(post?._id);
  return (
    <li className="flex flex-grow basis-1/4 flex-col rounded-[8px] bg-gray-700 shadow-lg transition-transform hover:scale-[1.02]">
      <Link to={`/posts/${post?._id}`}>
        <div className={post?.imgUrl ? 'flex h-80 rounded-sm' : 'flex rounded-sm'}>
          {post?.imgUrl && (
            <img
              loading="lazy"
              src={`${path}/${post.imgUrl}`}
              alt="img"
              className="w-full object-cover"
            />
          )}
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between ">
            <p className="text-xs text-white opacity-60">Author: {post?.username}</p>
            <div className="text-xs text-white opacity-60">
              <Moment date={post?.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <h2 className="pt-2 text-2xl text-white ">{post?.title}</h2>
          <p className="pt-2 text-sm text-white opacity-80 line-clamp-4">{post?.text}</p>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center justify-between gap-2 text-xs text-white opacity-90">
              <AiFillEye className="text-base" />
              <span>{post?.views}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs text-white opacity-90">
              <AiOutlineMessage className="text-base" />
              <span>{post?.comments?.length}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
