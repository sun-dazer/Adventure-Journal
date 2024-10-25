import React, { useState } from 'react';
import './Fonts/styles.css'; 

import LoginForm from './Pages/LoginPage/LoginForm';
import HomePage from './Pages/AboutUs/Home';
import Profile from './Pages/ViewProfile/Profile';
import CreateProfiles from './Pages/MakeProfile/CreateProfiles';
import Explore from './Pages/Explore/Explore';
import Tips from './Pages/TipsForum/Tips';

import Header from './Components/Header/Header';

import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/Login" element={<LoginForm onLogin={handleLogin}/>} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="/CreateProfiles" element={<CreateProfiles />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Tips" element={<Tips />} />
      </Routes>
    </div>
  );
}

export default App;
