// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Projects from './Projects';
import InventoryPage from './InventoryPage';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';
import SignOut from './SignOut';
import Reports from './Reports';
import Unauthorized from './Unauthorized';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [theme, setTheme] = useState('');
  // State to store selected project ID (if needed)
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? '' : 'dark'));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Header onToggleTheme={toggleTheme} theme={theme} />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/signout" element={<SignOut />} />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <ProtectedRoute>
                    <Projects setSelectedProject={setSelectedProject} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/project/:projectId" 
                element={
                  <ProtectedRoute>
                    <InventoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    {selectedProject ? <Reports projectId={selectedProject} /> : <div style={{ textAlign: 'center', marginTop: '20px' }}>Please select a project to generate a report.</div>}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings theme={theme} onToggleTheme={toggleTheme} />
                  </ProtectedRoute>
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
