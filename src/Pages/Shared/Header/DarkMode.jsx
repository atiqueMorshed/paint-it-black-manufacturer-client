import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('paintitblack-theme') || 'night'
  );

  useEffect(() => {
    if (theme === 'night' || theme === 'corporate') {
      localStorage.setItem(
        'paintitblack-theme',
        JSON.stringify({ mode: theme })
      );
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div
      onClick={() =>
        setTheme((prev) => (prev === 'night' ? 'corporate' : 'night'))
      }
      className="cursor-pointer w-fit"
    >
      {theme === 'corporate' ? (
        <FontAwesomeIcon className="w-6 h-6" icon={faSun} />
      ) : (
        <FontAwesomeIcon className="w-6 h-6" icon={faMoon} />
      )}
    </div>
  );
};

export default DarkMode;
