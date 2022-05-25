import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useGetUserType } from '../../Hooks/useGetUserType';

import SpinnerFullScreen from './SpinnerFullScreen';

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const {
    isLoading,
    isFetching,
    isRefetching,
    isError,
    error,
    isSuccess,
    data,
  } = useGetUserType({ uid: user.uid, name: 'checkUserTypeAdminAuth' });

  useEffect(() => {
    if (isSuccess && data !== 'admin') {
      toast.error(
        (t) => (
          <div className="flex gap-3 items-center">
            <p>Not an admin!</p>
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
              icon={faClose}
            />
          </div>
        ),
        {
          duration: 6000,
          id: 'notAnAdmin',
        }
      );
    }
  }, [isSuccess, data]);

  if (loading || isLoading || isFetching || isRefetching) {
    return <SpinnerFullScreen />;
  }
  if (isError) {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to get user type.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorGettingUserType',
      }
    );
  }

  if (isSuccess && data === 'admin') {
    return children;
  }

  return <Navigate to="/" />;
};

export default RequireAdmin;
