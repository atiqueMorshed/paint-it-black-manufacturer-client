import React from 'react';
import { useGetPrivateData } from '../../Hooks/useGetPrivateData';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';

const Profile = () => {
  const {
    isLoading,
    isFetching,
    isRefetching,
    isError,
    isSuccess,
    error,
    data,
    refetch,
  } = useGetPrivateData({ url: '/api/review', name: 'getReviews' });

  if (isLoading || isFetching || isRefetching) {
    return <SpinnerFullScreen />;
  }

  if (isError) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">Edit Profile</h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading profile information from server
          </h1>
          <h1 className="text-center">{error?.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-32">
      <h1 className="text-4xl font-medium text-center mb-16">Edit Profile</h1>
      <div className="w-11/12 max-w-xl xl:max-w-[1200px] mx-auto flex flex-col gap-10"></div>
    </div>
  );
};

export default Profile;
