import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <div className="container mx-auto px-4 xl:max-w-5xl">
      <header className="mx-auto">
        <NavBar />
      </header>
      <Outlet />
    </div>
  );
};
