import React, { useState, useEffect } from 'react';
import './Tips.css';

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState('');
  const [error, setError] = useState(null); // For error handling
  const username = localStorage.getItem('username') || 'someperson'; // Retrieve from local storage if needed

  // Fetch tips on load
  useEffect(() => {
    fetch("http://localhost:8000/app/get-tips/", {
      method: "GET",
      credentials: "include", // Include cookies for session-based auth
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("User is not logged in!");
          }
          throw new Error("Failed to fetch tips.");
        }
        return response.json();
      })
      .then((data) => setTips(data.tips))
      .catch((error) => setError(error.message));
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setNewTip(event.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTip.trim() === '') return; // Prevent adding empty tips

    // Send the new tip to the server
    fetch("http://localhost:8000/app/save-tip/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newTip }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save tip");
        }
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error("Error saving tip:", error));
  };

  return (
    <div className="Tips">
      <h2>Tips Forum</h2>
      {error && <p className="error">{error}</p>}

      {/* Form for adding tips */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTip}
          onChange={handleInputChange}
          placeholder="Share your tip..."
        />
        <button type="submit">Add Tip</button>
      </form>

      {/* Display list of tips */}
      <div className="TipsList">
        {tips.length === 0 ? (
          <p>No tips shared</p>
        ) : (
          tips
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort tips by most recent
            .map((tip, index) => (
              <div key={index} className="Tip">
                <small>{tip.username}</small> 
                <p>{tip.content}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Tips;
