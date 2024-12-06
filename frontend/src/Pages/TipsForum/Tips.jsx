import React, { useState, useEffect } from "react";
import "./Tips.css";
import upvote from "../../Images/upvote.png";  

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null); // Corrected state definition

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
          localStorage.setItem('username', data.username); // Optionally store in localStorage
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('username');
        }
      })
      .catch((error) => console.error("Error checking login status:", error));
  }, []);
  
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
        setNewTip(""); // Clear the input field
        // Optionally, fetch tips again instead of reloading
        return fetch("http://localhost:8000/app/get-tips/", {
          method: "GET",
          credentials: "include",
        });
      })
      .then((response) => response.json())
      .then((data) => setTips(data.tips))
      .catch((error) => console.error("Error saving tip:", error));
  };

  // Handle upvote
  const handleUpvote = (tipId) => {
    fetch("http://localhost:8000/app/upvote-tip/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tip_id: tipId }), // Send tip_id in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Upvoted successfully!") {
          setTips((prevTips) =>
            prevTips.map((tip) =>
              tip.id === tipId ? { ...tip, upvotes: data.upvotes } : tip
            )
          );
        } else {
          console.error("Error:", data.msg);
          // Optionally, display an error message to the user
        }
      })
      .catch((error) => console.error("Error upvoting tip:", error));
  };

  return (
    <div className="Tips">
      <h2>Tips Forum</h2>
      {error && <p className="error">{error}</p>}

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

      <div className="TipsList">
        {tips.length === 0 ? (
          <p>No tips shared</p>
        ) : (
          tips
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
                <p>{tip.content}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Tips;