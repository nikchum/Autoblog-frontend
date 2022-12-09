import React from 'react';

export const CommentItem = ({ comment }) => {
  const avatar = comment.comment.trim().toUpperCase().split('').splice(0, 2);

  return (
    <li className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-300 text-lg">
        {avatar}
      </div>
      <p className="flex text-[12px] text-gray-300">{comment.comment}</p>
    </li>
  );
};
