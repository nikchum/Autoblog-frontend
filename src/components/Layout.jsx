import React from 'react';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <header>
      <div className="container mx-auto">
        <NavBar />
        {children}
      </div>
    </header>
  );
};
