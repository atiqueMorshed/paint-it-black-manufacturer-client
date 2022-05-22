import React from 'react';
import Spinner from './Spinner';

const SpinnerFullScreen = () => {
  return (
    <div className="absolute top-[100px] left-0 h-[calc(100vh-100px)] w-screen bg-base-100 flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default SpinnerFullScreen;
