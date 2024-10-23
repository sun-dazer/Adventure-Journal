import React from 'react';
import './App.css';

import LoginForm from './Pages/LoginPage/LoginForm';
import HomePage from './Pages/AboutUs/Home';
import Profile from './Pages/ViewProfile/Profile';
import CreateProfiles from './Pages/MakeProfile/CreateProfiles';
import Explore from './Pages/Explore/Explore';
import Tips from './Pages/TipsForum/Tips';

import Header from './Components/Header/Header';

import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CreateProfiles" element={<CreateProfiles />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Tips" element={<Tips />} />
      </Routes>
    </div>
  );
}

export default App;
