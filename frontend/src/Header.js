// frontend/src/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';
import logo from './assets/acephap_logo.png'; // Ensure this path is correct

/**
 * Header Component
 * Displays the brand logo, title, navigation tabs, an optional search bar,
 * and a button to toggle the theme.
 *
 * Props:
 * - onToggleTheme: Function to toggle between light and dark modes.
 * - theme: Current theme string ("dark" for dark mode, empty for light mode).
 */
function Header({ onToggleTheme, theme }) {
  return (
    <header className="header">
      {/* Left section with logo and title */}
      <div className="header-left">
        <img src={logo} alt="Logo" className="brand-logo" />
        <h1>ACEPHAP INVENTORIES</h1>
      </div>

      {/* Navigation tabs */}
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>

      {/* Optional search bar */}
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>

    
    </header>
  );
}

export default Header;
