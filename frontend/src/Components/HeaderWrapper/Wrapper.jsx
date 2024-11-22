import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Header from "../Header/Header";
import logo from "../../Images/TRAIL TALES.png"; 
import "./Wrapper.css";

export default function HeaderWrapper({ isLoggedIn, onLogout, search, setSearch }) {
  return (
    <header className="header">
          <img src={logo} alt="Trail Tales Logo" className="logo" />
        <div className="header-navigation">
          <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        </div>
        
        <div className="searchTop">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
    </header>
  );
}
