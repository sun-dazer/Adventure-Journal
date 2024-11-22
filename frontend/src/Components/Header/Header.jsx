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
                <Link to="/Posts" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Tips Forum</button>
                </Link>
                <Link to="/Login" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Login</button>
                </Link>
                </>
            ) : (
                <>
                <Link to="/Home" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Home</button>
                </Link>
                <Link to="/Posts" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Tips Forum</button>
                </Link>
                <Link to="/Profile" style={{ textDecoration: 'none' }}>
                    <button className="topButton">Profile</button>
                </Link>
                </>
            
            )}
        </div>
    );
}
