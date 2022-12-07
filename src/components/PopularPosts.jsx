import React from 'react';

export const PopularPosts = ({ post }) => {
  return (
    <li className="my-1 cursor-pointer bg-gray-600">
      <p className="flex p-2 text-xs text-gray-300 hover:bg-gray-600 hover:text-white">
        {post.title}
      </p>
    </li>
  );
};
