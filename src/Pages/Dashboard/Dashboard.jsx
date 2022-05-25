import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
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
          <ul className="menu p-4 overflow-y-auto w-40 sm:w-60 bg-base-100 text-base-content">
            {/* Sidebar content here */}
            <Link to="/dashboard/" className="btn btn-ghost text-sm sm:text-lg">
              My Orders
            </Link>
            <Link
              to="/dashboard/profile"
              className="btn btn-ghost text-sm sm:text-lg"
            >
              My Profile
            </Link>
            <Link
              to="/dashboard/review"
              className="btn btn-ghost text-sm sm:text-lg"
            >
              Add Review
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
