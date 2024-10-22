import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
        <li><Link to="/loginform">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Links;
