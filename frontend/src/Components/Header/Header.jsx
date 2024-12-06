import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ isLoggedIn, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false); // Close dropdown when an option is clicked
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside); 
    };
  }, []);

  return (
    <div className="Header">
      <div className="HeaderContent">
        {!isLoggedIn ? (
          <>
            <Link to="/Home" style={{ textDecoration: 'none' }}>
              <button className="topButton">Home</button>
            </Link>
            <div className="dropdown" ref={dropdownRef}>
              <button className="topButton dropdownButton" onClick={toggleDropdown}>
                Posts
              </button>
              {dropdownOpen && (
                <div className="dropdownMenu">
                  <Link to="/Posts" style={{ textDecoration: 'none' }}>
                    <button className="dropdownItem" onClick={handleOptionClick}>
                      Hike Posts
                    </button>
                  </Link>
                  <Link to="/Tips" style={{ textDecoration: 'none' }}>
                    <button className="dropdownItem" onClick={handleOptionClick}>
                      Tips
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/Login" style={{ textDecoration: 'none' }}>
              <button className="topButton">Login</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/Explore" style={{ textDecoration: 'none' }}>
              <button className="topButton">Explore</button>
            </Link>
            <div className="dropdown" ref={dropdownRef}>
              <button className="topButton dropdownButton" onClick={toggleDropdown}>
                Posts
              </button>
              {dropdownOpen && (
                <div className="dropdownMenu">
                  <Link to="/Posts" style={{ textDecoration: 'none' }}>
                    <button className="dropdownItem" onClick={handleOptionClick}>
                      Hike Posts
                    </button>
                  </Link>
                  <Link to="/Tips" style={{ textDecoration: 'none' }}>
                    <button className="dropdownItem" onClick={handleOptionClick}>
                      Tips
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/Profile" style={{ textDecoration: 'none' }}>
              <button className="topButton">Profile</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
