import React from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ search, setSearch }) {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/user/${search.trim()}`);
      window.location.reload();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="search-input"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
