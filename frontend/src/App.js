// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components and pages
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Projects from './Projects';
import InventoryPage from './InventoryPage';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';
import SignOut from './SignOut';
import Reports from './Reports';  // Import the Reports component

/**
 * App Component
 * - Manages theme and selected project state.
 * - Sets up routing for the entire application.
 * - Passes the selected project ID to the Reports page for dynamic report generation.
 */
function App() {
  // State for theme toggling: empty string for light mode, "dark" for dark mode.
  const [theme, setTheme] = useState('');
  // State to store the currently selected project ID (dynamically set from Projects component)
  const [selectedProject, setSelectedProject] = useState(null);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? '' : 'dark'));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        {/* Header receives the theme toggle functionality */}
        <Header onToggleTheme={toggleTheme} theme={theme} />
        <div className="app-container">
          {/* Sidebar for navigation */}
          <Sidebar />
          <main className="main-content">
            <Routes>
              {/* Authentication routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signout" element={<SignOut />} />
              {/* Settings page for additional preferences */}
              <Route path="/settings" element={<Settings theme={theme} onToggleTheme={toggleTheme} />} />
              {/* Default landing page */}
              <Route path="/" element={<Dashboard />} />
              {/* Projects page: Pass the setter to update selectedProject */}
              <Route path="/projects" element={<Projects setSelectedProject={setSelectedProject} />} />
              {/* Inventory page for a specific project; projectId is read from URL */}
              <Route path="/project/:projectId" element={<InventoryPage />} />
              {/* Reports page: Use the selectedProject from state to generate a report */}
              <Route 
                path="/reports" 
                element={
                  selectedProject 
                    ? <Reports projectId={selectedProject} /> 
                    : <div style={{ textAlign: 'center', marginTop: '20px' }}>Please select a project from the Projects page to generate a report.</div>
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
