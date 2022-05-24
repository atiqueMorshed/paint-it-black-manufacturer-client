import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFeatherPointed, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../../firebase.init';
import DarkMode from './DarkMode';

import SpinnerFullScreen from '../SpinnerFullScreen';

const Header = () => {
  const [authUser, authLoading] = useAuthState(auth);

  if (authLoading) return <SpinnerFullScreen />;

  return (
    <div className="border-b shadow">
      <div className="flex items-center justify-between w-9/12 mx-auto py-5">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <FontAwesomeIcon
            className="w-10 h-10 text-primary"
            icon={faFeatherPointed}
          />
          <div className="flex flex-col justify-center text-xl font-extrabold">
            <p>Paint It</p>
            <p>Black</p>
          </div>
        </Link>

        <div className="right">
          {/* Hamburger menu */}
          <div className="dropdown dropdown-end block md:hidden">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {authUser ? (
                <>
                  <Link to="/dashboard" className="btn btn-ghost text-lg">
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="btn btn-ghost text-lg"
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faUser} />{' '}
                    {authUser?.displayName && (
                      <p className="text-lg ml-2">
                        {authUser.displayName.split(' ')[0]}
                      </p>
                    )}
                  </Link>

                  <div
                    onClick={() => {
                      localStorage.removeItem('paintitblack-at');
                      signOut(auth);
                    }}
                    className="btn btn-ghost text-lg"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    <p className="pl-2">Logout</p>
                  </div>
                </>
              ) : (
                <Link to="/login" className="btn btn-ghost text-lg">
                  Login
                </Link>
              )}
              <div className="btn btn-ghost flex items-center gap-2">
                <DarkMode />
              </div>
            </ul>
          </div>

          {/* Large Device Menu */}
          <div className="hidden md:block">
            <div className="flex justify-center items-center">
              {authUser && (
                <Link to="/dashboard" className="btn btn-ghost text-lg">
                  Dashboard
                </Link>
              )}
              <div className="dropdown dropdown-end bg-base-100 mr-2">
                <label tabIndex="0" className="btn btn-ghost">
                  <FontAwesomeIcon className="w-6 h-6" icon={faUser} />
                  {authUser?.displayName && (
                    <p className="text-lg ml-2">
                      {authUser.displayName.split(' ')[0]}
                    </p>
                  )}
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  {authUser ? (
                    <>
                      <Link
                        to="/dashboard/profile"
                        className="btn btn-ghost text-lg"
                      >
                        Profile
                      </Link>
                      <div
                        onClick={() => {
                          localStorage.removeItem('paintitblack-at');
                          signOut(auth);
                        }}
                        className="btn btn-ghost text-lg"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-ghost text-lg">
                        Login
                      </Link>
                      <Link to="/register" className="btn btn-ghost text-lg">
                        Register
                      </Link>
                    </>
                  )}
                </ul>
              </div>
              <div className="border-l-2 pl-2">
                <div className="btn btn-ghost">
                  <DarkMode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
