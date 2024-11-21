import React, { useState, useEffect } from "react";
import "./Fonts/styles.css";

import LoginForm from "./Pages/LoginPage/LoginForm";
import HomePage from "./Pages/AboutUs/Home";
import Profile from "./Pages/ViewProfile/Profile";
import CreateProfiles from "./Pages/MakeProfile/CreateProfiles";
import ForgotPassword from "./Pages/ForgotPassword/forgotPassword";
import Explore from "./Pages/Explore/Explore";
import Tips from "./Pages/TipsForum/Tips";

import Header from "./Components/Header/Header";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a login token exists in localStorage
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    fetch("http://localhost:8000/app/logout/", {
      method: "POST",
      credentials: "include", // Send cookies for session-based auth
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          navigate("/Login"); // Redirect to Login page
        } else {
          alert("Failed to log out. Please try again.");
        }
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/Login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="/CreateProfiles" element={<CreateProfiles />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Tips" element={<Tips />} />
      </Routes>
    </div>
  );
}

export default App;
