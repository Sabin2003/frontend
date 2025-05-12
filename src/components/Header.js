// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <div className="logo">CT</div>
          <h2>MboaTranslate</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;