import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Header.css"

export default function Header(){
    return(
        <>
        <div className="Header">
            <Link to="/HomePage" style={{ textDecoration: 'none' }}>
                <button className="topButton">
                    Home
                </button>
            </Link>
            <Link to="/loginform" style={{ textDecoration: 'none' }}>
                <button className="topButton" >
                    Login
                </button>
            </Link>
            <Link to="/ProfilePage" style={{ textDecoration: 'none' }}>
                <button className="topButton">
                    Profile
                </button>
            </Link>
        </div>
        </>
    )
}
