// frontend/src/Settings.js

import React from 'react';
import './Settings.css';

/**
 * Settings Component
 * Displays a standard settings page with separate sections for appearance and notifications.
 *
 * Props:
 * - theme: Current theme ("dark" for dark mode, empty string for light mode).
 * - onToggleTheme: Function to toggle between light and dark modes.
 */
function Settings({ theme, onToggleTheme }) {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="settings-container">
        {/* Appearance Section */}
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <span>Theme Mode:</span>
            <button onClick={onToggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>
              Email Notifications:
              <input type="checkbox" disabled />
            </label>
          </div>
          {/* You can add more notification settings here */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
