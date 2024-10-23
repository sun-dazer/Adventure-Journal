import React from 'react';
import './App.css';
import LoginForm from './Pages/LoginPage/LoginForm/LoginForm';
import Header from './Components/Header/Header';
import Page1 from './Pages/AboutUs/Home';
import Page2 from './Pages/ViewProfile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  );
}

export default App;
