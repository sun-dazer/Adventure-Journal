import React from "react";
import "./SearchBar.css";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
}
