import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

import { useState } from 'react';

function Navbar({ userName, theme, toggleTheme }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon"></span>
          <span className="brand-text">Eventura</span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className={`navbar-link ${isActive('/categories') ? 'active' : ''}`}
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
        </div>
        
        <div className="navbar-actions">
          <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle dark/light mode">
            {theme === 'dark' ? (
              <span role="img" aria-label="Light mode">🌞</span>
            ) : (
              <span role="img" aria-label="Dark mode">🌙</span>
            )}
          </button>
          <button className="profile-button">
            👤
            {userName && <span className="navbar-username">{userName}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
