// frontend/src/App.js

import React, { useState } from 'react';
// Import BrowserRouter, Routes, and Route from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Import the Projects and InventoryPage components
import Projects from './Projects';
import InventoryPage from './InventoryPage';
// Import Registration and Login components
import Register from './Register';
import Login from './Login';


function App() {
  // State for theme toggling (e.g., light mode vs dark mode)
  const [theme, setTheme] = useState('');

  // Function to toggle the theme between dark and light modes
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? '' : 'dark'));
  };

  return (
    // Wrap the app in a Router to enable routing between pages
    <Router>
      <div className={`App ${theme}`}>
        {/* Header with title and theme toggle button */}
        <header className="App-header">
          <h1>Inventory Management App</h1>
          <button onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </header>
        <main>
          {/* Define application routes */}
          <Routes>
            {/* Route for registration */}
            <Route path="/register" element={<Register />} />
            {/* Route for login */}
            <Route path="/login" element={<Login />} />
            {/* Route for the Projects page (root path) */}
            <Route path="/" element={<Projects />} />
            {/* Route for the Inventory page for a selected project.
                The InventoryPage component will use the projectId from the URL params */}
            <Route path="/project/:projectId" element={<InventoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
