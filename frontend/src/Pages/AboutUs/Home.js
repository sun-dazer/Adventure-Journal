import React from 'react';
import "./Home.css";
import HomeBanner from '../../Images/HomeBanner.png';
import BeiyuImage from '../../Images/AnQiImage.png';
import AnQiImage from '../../Images/AnQiImage.png';
import AngelImage from '../../Images/AnQiImage.png';
import GriffinImage from '../../Images/AnQiImage.png';

const teamMembers = [
  {
    name: "BeiYu Wang",
    role: "Project Manager & Frontend Developer",
    bio: "BeiYu...",
    image: BeiyuImage,
  },
  {
    name: "Abigail An Qi Meiser",
    role: "UI/UX and Frontend Developer",
    bio: "AnQi...",
    image: AnQiImage,
  },
  {
    name: "Angel Maldonado",
    role: "UI/UX Designer",
    bio: "Angel...",
    image: AngelImage,
  },
  {
    name: "Griffin Dale",
    role: "Backend Developer",
    bio: "Griffin...",
    image: GriffinImage,
  },
];

const HomePage = () => {
  return (
    <div className="HomePage">
      <h2>Welcome to Trail Tales!</h2>
      <img src={HomeBanner} className="logoTxt" alt="Trail Tales Logo" />
      
      {/* About Us Section */}
      <div className="aboutSection">
        <h3>About Us</h3>
        <p>
          At Trail Tales, we’re all about helping adventurers like you document, share, and 
          relive your outdoor experiences. Whether you’re scaling mountains, hiking through 
          lush forests, or finding hidden gems off the beaten path, our app is here to be your 
          companion. 
        </p>
        <p>
          Our mission is to create a community where outdoor enthusiasts can connect, share tips, 
          and inspire each other. With features like journaling, forums, and personalized profiles, 
          we aim to make every adventure memorable.
        </p>
        <p>
          Join us in turning every hike, climb, and trek into a story worth sharing!
        </p>
      </div>
      
      {/* Meet Our Team Section */}
      <div className="teamSection">
        <h3>Meet Our Team</h3>
        <div className="teamGrid">
          {teamMembers.map((member, index) => (
            <div key={index} className="teamMember">
              <img src={member.image} alt={`${member.name}`} className="teamImage" />
              <div className="teamInfo">
                <h4>{member.name}</h4>
                <p><strong>{member.role}</strong></p>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
