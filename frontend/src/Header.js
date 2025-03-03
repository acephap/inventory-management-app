import React from 'react';
import './Header.css';
import logo from './assets/acephap_logo.png'; // Adjust the path based on your folder structure

function Header({ onToggleTheme, theme }) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Logo or brand name */}
        <img src="/assets/acephap_logo.png" alt="Logo" className="brand-logo" />
        <h1>ACEPHAP INVENTORIES</h1>
      </div>
      <div className="header-right">
        {/* Optional search bar or user profile */}
        <button onClick={onToggleTheme}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </header>
  );
}

export default Header;
