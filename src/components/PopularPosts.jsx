import React from 'react';
import { Link } from 'react-router-dom';

export const PopularPosts = ({ post }) => {
  return (
    <li className="my-1 cursor-pointer bg-gray-600">
      <Link
        to={`${post._id}`}
        className="flex p-2 text-xs text-gray-300 hover:bg-gray-600 hover:text-white"
      >
        {post.title}
      </Link>
    </li>
  );
};
