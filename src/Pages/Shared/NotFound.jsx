import React from 'react';

const NotFound = () => {
  return (
    <div className="w-screen h-[calc(100vh-100px)] flex justify-center items-center pointer-events-none">
      <div className="flex items-center">
        <h1 className="text-3xl">404</h1>
        <div className="divider divider-horizontal"></div>
        <h1 className="text-3xl">NOT FOUND</h1>
      </div>
    </div>
  );
};

export default NotFound;
