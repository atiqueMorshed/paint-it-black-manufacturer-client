import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('paintitblack-theme') || 'light'
  );

  useEffect(() => {
    if (theme === 'dark' || theme === 'light') {
      localStorage.setItem('paintitblack-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className="cursor-pointer w-fit"
    >
      {theme === 'light' ? (
        <FontAwesomeIcon className="w-6 h-6" icon={faSun} />
      ) : (
        <FontAwesomeIcon className="w-6 h-6" icon={faMoon} />
      )}
    </div>
  );
};

export default DarkMode;
