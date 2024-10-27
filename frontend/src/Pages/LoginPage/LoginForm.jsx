import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(username && password)) return;
        fetch("http://localhost:8000/app/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((resp) => {
            if (resp.status === 200) {
                navigate('/page1');
            }
            else {
                resp.json().then((j) => {
                    console.log(j);
                });
            }
        });
    };

  return (
    /*<div className='background-container'>*/
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className='icon'/>
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    {/* link instead of (hyperlink?) */}
                    <Link to='#'>Forgot password?</Link>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    {/* Switched here too */}
                    <p>Don't have an account? <Link to="/CreateProfiles">Register</Link></p>
                </div>
            </form>
        </div>
    /*</div>*/
  );
};

export default LoginForm;