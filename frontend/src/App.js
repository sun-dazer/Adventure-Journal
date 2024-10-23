import React from 'react';
import './App.css';
import LoginForm from './Pages/LoginPage/LoginForm/LoginForm';
import Links from './Link';
import Page1 from './Pages/page1';
import Page2 from './Pages/page2';
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
