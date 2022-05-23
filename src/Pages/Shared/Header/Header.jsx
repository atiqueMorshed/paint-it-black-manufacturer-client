import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faFeatherPointed,
} from '@fortawesome/free-solid-svg-icons';

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

        <div className="right flex justify-center items-center gap-3">
          {authUser ? (
            <div
              onClick={() => {
                localStorage.removeItem('paintitblack-at');
                signOut(auth);
              }}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                className="w-6 h-6"
                icon={faArrowRightFromBracket}
              />
            </div>
          ) : (
            <Link to="/login" className="user cursor-pointer">
              <FontAwesomeIcon className="w-6 h-6" icon={faUser} />
            </Link>
          )}
          <div className="border-l-2 pl-2">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
