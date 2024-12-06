import React, { useState, useEffect } from "react";
import "./Tips.css";
import upvote from "../../Images/upvote.png";  

const Tips = () => {
  const [tips, setTips] = useState([]);
<<<<<<< HEAD
  const [newTip, setNewTip] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const username = localStorage.getItem('username') || 'someperson'; // Retrieve from local storage if needed
  const [setUsername] = useState(null);

  //check login status
  useEffect(() => {
    fetch("http://localhost:8000/app/check-login/", {
      method: "GET",
      credentials: "include", // Include cookies for session-based authentication
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_logged_in) {
          setIsLoggedIn(true);
          setUsername(data.username); // Store the logged-in user's username
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.error("Error checking login status:", error));
  }, []);
=======
  const [newTip, setNewTip] = useState("");
  const [error, setError] = useState(null);
>>>>>>> adding-gitignore

  // Fetch tips on load
  useEffect(() => {
    fetch("http://localhost:8000/app/get-tips/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("User is not logged in!");
        }
        if (!response.ok) {
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
    if (newTip.trim() === "") return;

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

  // Handle upvote
  const handleUpvote = (tipId) => {
    fetch(`http://localhost:8000/app/upvote-tip/${tipId}/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upvote tip");
        }
        return response.json();
      })
      .then((updatedTip) => {
        setTips((prevTips) =>
          prevTips.map((tip) =>
            tip.id === updatedTip.id ? { ...tip, upvotes: updatedTip.upvotes } : tip
          )
        );
      })
      .catch((error) => console.error("Error upvoting tip:", error));
  };

  return (
    <div className="Tips">
      <h2>Tips Forum</h2>
      {error && <p className="error">{error}</p>}

<<<<<<< HEAD
      {/* Form for adding tips (visible only if logged in) */}
      {isLoggedIn ? (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={newTip}
            onChange={handleInputChange}
            placeholder="Share your tip..."
          />
          <button type="submit">Add Tip</button>
        </form>
      ) : (
        <p className="login-prompt">Please log in to add a post.</p>
      )}
=======
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTip}
          onChange={handleInputChange}
          placeholder="Share your tip..."
        />
        <button type="submit">Add Tip</button>
      </form>
>>>>>>> adding-gitignore

      <div className="TipsList">
        {tips.length === 0 ? (
          <p>No tips shared</p>
        ) : (
          tips
<<<<<<< HEAD
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by most recent
            .map((tip, index) => (
              <div key={index} className="Tip">
                <small>{tip.username}</small>
=======
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((tip) => (
                <div key={tip.id} className="Tip">
                <div className="TipHeader">
                  <small className="TipUsername">{tip.username}</small>
                  <div className="TipActions">
                    <button className="upvoteButton" onClick={() => handleUpvote(tip.id)}>
                      <img src={upvote} alt="Thumbs Up" />
                    </button>
                    <span className="upvoteCount">{tip.upvotes || 0}</span>
                  </div>
                </div>
>>>>>>> adding-gitignore
                <p>{tip.content}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Tips;