  import "./Profile.css";
  import React, { useState, useEffect } from "react";
  import Avatar from '../../Images/Avatar.webp';

  const Profile = ({ onLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
      fetch("http://localhost:8000/app/get-profile/", {
        method: "GET",
        credentials: "include", // Include cookies for session-based auth
      })
        .then((response) => {
          if (!response.ok) {
            setError(`PLease login to view information.`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched profile data:", data); // Debug log
          const userData = data.profile;
          setUser(userData);
          console.log("User state:", user);
          setFormData({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            dob: userData.dob || "",
            username: userData.username || "",
            password: "",
            bio: userData.bio || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setError(error.message);
        });
    }, []);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
      fetch("http://localhost:8000/app/update-profile/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save profile.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Profile updated:", data); // Debug log
          setUser({ ...user, ...formData });
          setIsEditing(false); // Exit editing mode
        })
        .catch((error) => {
          console.error("Error saving profile:", error);
          setError(error.message);
        });
    };

    const handleLogout = () => {
      fetch("http://localhost:8000/app/logout/", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Logout successful"); // Debug log
            localStorage.removeItem("username"); // Clear local storage
            window.location.href = "/login"; // Redirect to login
          } else {
            console.error("Logout failed");
          }
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    };

    if (error) {
      return (
        <div className="error-center">
          <h2>Login or Sign Up!</h2>
          <p> Join Trail Tales to track your hikes, connect with fellow adventurers, and share your tips!</p>
          <p>"The best journeys are the ones we share with others." – Avid Hiker</p>
          <button onClick={handleLogout}>Join Here!</button>
          
        </div>
      );
    }

    if (!user) {
      // display loading message
      return (
        <div className="loading-center">
          <p>Loading profile...</p>
        </div>
      );
    }

    return (
      <div className="ProfilePage">
    <h2>Profile</h2>

    {isEditing ? (
      <form
        className="EditProfileForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label>First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </label>
        <label>Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled
          />
        </label>
        <label>Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        
        <div className="ProfileActions">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    ) : (
      <div className="ProfileDetails">
        <img src={Avatar} alt="Profile Avatar" />
        <div className="ProfileInfo">
          <p><strong>Username:</strong> {user.username || ""}</p>
          <p><strong>First Name:</strong> {user.first_name || ""}</p>
          <p><strong>Last Name:</strong> {user.last_name || ""}</p>
          <p><strong>Date of Birth:</strong> {user.dob || ""}</p>
          {/* <p><strong>Password:</strong> {"******"}</p> */}
          <p><strong>Bio:</strong> {user.bio || "You haven't added a bio yet. Click Edit Profile to add one."}</p>
        </div>
        <div className="ProfileActions">
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )}
  </div>
    );
  };

  export default Profile;
