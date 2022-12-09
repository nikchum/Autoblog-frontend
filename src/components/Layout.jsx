import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="mx-auto max-w-[1100px]">
        <NavBar />
      </header>
      <Outlet />
    </div>
  );
};
