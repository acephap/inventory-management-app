// frontend/src/App.js

import React, { useState } from 'react';
// Import BrowserRouter, Routes, and Route from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the new Header component, Sidebar, and all other pages
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Projects from './Projects';
import InventoryPage from './InventoryPage';
import Register from './Register';
import Login from './Login';

function App() {
  // State for theme toggling: empty string for light mode, "dark" for dark mode.
  const [theme, setTheme] = useState('');

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? '' : 'dark'));
  };

  return (
    // Wrap the app in a Router to enable routing between pages
    <Router>
      <div className={`App ${theme}`}>
        {/* Header component receives the toggle function and current theme */}
        <Header onToggleTheme={toggleTheme} theme={theme} />
        {/* Container for Sidebar and Main Content */}
        <div className="app-container">
          {/* Sidebar component (navigation links) */}
          <Sidebar />
          {/* Main content area: routes for different pages */}
          <main className="main-content">
            <Routes>
              {/* Routes for authentication pages */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* Dashboard is the default landing page */}
              <Route path="/" element={<Dashboard />} />
              {/* Projects page (if needed as a separate route) */}
              <Route path="/projects" element={<Projects />} />
              {/* InventoryPage for a selected project; projectId is read from the URL */}
              <Route path="/project/:projectId" element={<InventoryPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
