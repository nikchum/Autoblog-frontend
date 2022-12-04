import React from 'react';

export const Button = ({ children, onClick = null, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="  flex items-center justify-center rounded-md border-[2px] border-green-600 py-1 px-3 transition-colors hover:border-cyan-600 hover:text-white focus:text-white"
    >
      {children}
    </button>
  );
};
