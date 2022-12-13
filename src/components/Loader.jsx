import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="mt-8 flex justify-center ">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};
