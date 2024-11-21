import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Header.css"

export default function Header({ isLoggedIn, onLogout }){
    return(
        <div className="Header">
            {!isLoggedIn ? (
                <>
                <Link to="/Home" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Home</button>
                </Link>
                <Link to="/Tips" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Tips Forum</button>
                </Link>
                <Link to="/Login" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Login</button>
                </Link>
                </>
            ) : (
                <>
                <Link to="/Explore" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Explore</button>
                </Link>
                <Link to="/Tips" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Tips Forum</button>
                </Link>
                <Link to="/Profile" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Profile</button>
                </Link>
                {/* <button
            className="topButton logoutButton"
            onClick={onLogout} // Trigger logout
          >
            Logout
          </button>
          </> */}
            </>
            )}
        </div>
    );
}
