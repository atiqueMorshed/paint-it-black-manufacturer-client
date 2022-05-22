import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import DarkMode from './DarkMode';

const Header = () => {
  return (
    <div className="border-b shadow">
      <Link
        to="/"
        className="flex items-center justify-between w-9/12 mx-auto py-5"
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <FontAwesomeIcon className="w-11 h-11" icon={faFeatherPointed} />
          <div className="flex flex-col justify-center text-xl font-extrabold">
            <p>Paint It</p>
            <p>Black</p>
          </div>
        </div>

        <div className="right flex justify-center items-center gap-3">
          <Link to="/login" className="user cursor-pointer">
            <FontAwesomeIcon className="w-6 h-6" icon={faUser} />
          </Link>
          <div className="border-l-2 pl-2">
            <DarkMode />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
