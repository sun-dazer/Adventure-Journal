import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/Login');
  };

  return (
    <div className="ProfilePage">
      <h2>Profile Page</h2>
        <button onClick={handleLogout}>Logout</button>
      <p>Displays user profiles</p>
    </div>
  );
};

export default Profile;
