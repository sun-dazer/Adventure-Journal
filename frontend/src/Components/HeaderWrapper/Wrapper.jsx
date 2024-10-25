import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import './Wrapper.css';
import Header from '../Header/Header';

export default function HeaderWrapper ({ search, setSearch }) {
  return (
    <header className="header">
        <div className = "searchTop">
          <SearchBar
        />
        </div>
        
    </header>
  );
}