import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useGetUserType } from '../../Hooks/useGetUserType';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { isLoading, isFetching, isRefetching, isError, error, data } =
    useGetUserType({ uid: user.uid, name: 'checkUserTypeDashBoard' });

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

  return (
    <div>
      <div className="drawer h-auto min-h-[calc(100vh-403px)]">
        <input id="dashboardMenu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-auto">
          <div className="">
            <div className="w-9/12 mx-auto my-4">
              <label htmlFor="dashboardMenu" className="btn drawer-button">
                Menu
              </label>
            </div>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboardMenu" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-40 sm:w-60 bg-base-100 text-base-content flex items-start">
            {/* Sidebar content here */}

            <Link to="/dashboard" className="btn btn-ghost text-sm sm:text-lg">
              My Profile
            </Link>

            {data === 'user' && (
              <>
                <Link
                  to="/dashboard/order"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  My Orders
                </Link>
                <Link
                  to="/dashboard/review"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  Add Review
                </Link>
              </>
            )}

            {data === 'admin' && (
              <>
                <Link
                  to="/dashboard/manage-order"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  Manage Order
                </Link>
                <Link
                  to="/dashboard/add-tool"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  Add tool
                </Link>
                <Link
                  to="/dashboard/manage-tool"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  Add Product
                </Link>
                <Link
                  to="/dashboard/make-admin"
                  className="btn btn-ghost text-sm sm:text-lg"
                >
                  Make Admin
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
