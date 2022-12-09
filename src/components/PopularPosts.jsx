import React from 'react';
import { Link } from 'react-router-dom';

export const PopularPosts = ({ post }) => {
  return (
    <li className="my-1 cursor-pointer rounded bg-gray-600 transition-opacity hover:opacity-80">
      <Link
        to={`${post._id}`}
        className="flex p-2 text-xs text-white hover:bg-gray-600 hover:text-white"
      >
        {post.title}
      </Link>
    </li>
  );
};
