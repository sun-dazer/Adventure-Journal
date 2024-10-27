// ForgotPassword.js
import React, { useState } from 'react';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="ForgotPassword">
      <h1>Forgot Password</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        // {username} to display users's username
        <p>Password reset process goes here? Login Again! </p>
      )}
    </div>
  );
};

export default ForgotPassword;
