import "./Profile.css";
import React, { useState, useEffect } from "react";

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
        setUser(data);
        console.log("User state:", user);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          dob: data.dob || "",
          username: data.username || "",
          password: data.password || "",
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
    // user is not logged in
    return (
      <div className="error-center">
        <h2>{error}</h2>
        <button onClick={handleLogout}>Login</button>
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
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled // Username should not be editable
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="ProfileDetails">
          <p>Username: {user.username || "N/A"}</p>
          <p>First Name: {user.first_name || "N/A"}</p>
          <p>Last Name: {user.last_name || "N/A"}</p>
          <p>Date of Birth: {user.dob || "N/A"}</p>
          <p>Password: {user.password || "N/A"}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
