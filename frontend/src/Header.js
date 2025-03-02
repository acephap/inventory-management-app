import React from 'react';
import './Header.css';

function Header({ onToggleTheme, theme }) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Logo or brand name */}
        <img src="/logo.png" alt="Brand Logo" className="brand-logo" />
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
