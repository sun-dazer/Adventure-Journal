import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css';

export default function Header({ isLoggedIn, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false); 
  };

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

  // Handle logout and redirect to Home page
  const handleLogout = () => {
    onLogout(); // Ensure the parent's onLogout function is called to log out the user
    navigate('/Home'); // Redirect to the Home page after logout
  };

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
              <button className="topButton">Welcome</button>
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
            <button className="topButton" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}