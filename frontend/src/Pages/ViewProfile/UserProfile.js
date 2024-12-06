import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [error, setError] = useState(null);

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
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [username]);

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
      <p>Followers: {profileUser.followers ? profileUser.followers.length : 0}</p>
      <p>Following: {profileUser.following ? profileUser.following.length : 0}</p>
    </div>
  );
};

export default UserProfile;
