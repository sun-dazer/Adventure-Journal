import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/app/get-user-profile/?username=${username}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hmm... The user you want to find doesn't exist.");
        }
        return res.json();
      })
      .then((data) => {
        setProfileUser(data.profile);
        checkIfFollowing(data.profile);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [username]);

  const checkIfFollowing = (profile) => {
    // Check if the logged-in user is following the profile user
    fetch(`http://localhost:8000/app/is-following/?username=${profile.username}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollowing(data.isFollowing); // Update follow status
      })
      .catch((err) => {
        console.error("Error checking follow status:", err);
      });
  };

  const handleFollow = () => {
    fetch("http://localhost:8000/app/follow/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: profileUser.username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to follow.");
        }
        setIsFollowing(true); // Set the follow status to true
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };

  const handleUnfollow = () => {
    fetch("http://localhost:8000/app/unfollow/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: profileUser.username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to unfollow.");
        }
        setIsFollowing(false); // Set the follow status to false
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
      });
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!profileUser) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="UserProfilePage">
      <h2>{profileUser.username}'s Profile</h2>
      <p><strong>Followers:</strong> {profileUser.followers ? profileUser.followers.length : 0}</p>
      <p><strong>Following:</strong> {profileUser.following ? profileUser.following.length : 0}</p>
      <p><strong>Bio:</strong> {profileUser.bio || "This user hasn't written a bio yet."}</p>
      
      <div className="follow-actions">
        {isFollowing ? (
          <button onClick={handleUnfollow}>Unfollow</button> // Show Unfollow button if following
        ) : (
          <button onClick={handleFollow}>Follow</button> // Show Follow button if not following
        )}
      </div>
    </div>
  );
};

export default UserProfile;
