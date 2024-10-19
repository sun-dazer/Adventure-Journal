import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Links from './Components/Links';
import Page1 from './Components/Pages/page1';
import Page2 from './Components/Pages/page2';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Links />
      <Routes>
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  );
}

export default App;
