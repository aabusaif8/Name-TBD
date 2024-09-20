import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/NavBar.css';

function NavBar() {
  return (
    <nav className="vertical-navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/following">Following</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/history">Reading History</Link></li>
        <li><Link to="/search">Advanced Search</Link></li>
        <li><Link to="/newest">Newest Releases</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;