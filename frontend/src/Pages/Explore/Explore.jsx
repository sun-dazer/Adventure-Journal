import React, { useState, useEffect } from 'react';
import './Explore.css'; 
const Explore = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/app/get-profile/", {
      method: "GET",
      credentials: "include", 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Please login to view your profile.");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.profile.username); 
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); 

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="explore-wrapper">
      <h2 className="explore-title">Welcome back, {username}!</h2>

    </div>
  );
};

export default Explore;
