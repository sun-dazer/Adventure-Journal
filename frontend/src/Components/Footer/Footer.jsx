import React from "react"

import logo from "../../Images/TRAIL TALES.png"

import "./Footer.css"

export default function Footer(){
    return (
        <footer className="footer">
        <img src={logo} className = "logo" alt="Logo"/>
        <div className="copyright">
          <b>&copy; 2024 Trail Tales</b>
        </div>
      </footer>
      );
}