import React from 'react';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <header className="mx-auto max-w-[1100px]">
        <NavBar />
      </header>
      {children}
    </div>
  );
};
