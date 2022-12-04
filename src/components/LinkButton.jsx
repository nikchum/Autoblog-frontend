import React from 'react';
import { Link } from 'react-router-dom';

export const LinkButton = ({ children, path }) => {
  return (
    <Link
      to={path}
      className=" flex items-center justify-center rounded-md border-[2px] border-green-600 py-1 px-3 transition-colors hover:border-cyan-600 hover:text-white focus:text-white"
    >
      {children}
    </Link>
  );
};
