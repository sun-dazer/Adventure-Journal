import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./mainHeader.css"

export default function MainHeader(){
    return(
        <>
        <div className="mainHeader">
            <Link to="/page1" style={{ textDecoration: 'none' }}>
                <button className="topButton">
                    Home
                </button>
            </Link>
            <Link to="/page2" style={{ textDecoration: 'none' }}>
                <button className="topButton">
                    page2
                </button>
            </Link>
            <div className=''>
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="topButton" >
                    Login
                </button>
            </Link>
            </div>
        </div>
        </>
    )
}