import React from 'react';
import "./Home.css";
import HomeBanner from '../../Images/HomeBanner.png';

const HomePage = () => {
  return (
    <div className="HomePage">
      <h2>Home</h2>
      <p>About us. Will swap to who the user is following after they log in.</p>
      <img src={HomeBanner} className = "logoTxt" alt="Logo"/>
    </div>
  );
};

export default HomePage;