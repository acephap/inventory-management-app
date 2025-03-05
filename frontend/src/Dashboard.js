// frontend/src/Dashboard.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Dashboard.css';

// Connect to your backend; make sure the URL/port matches your backend settings
const socket = io('http://localhost:5000');

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Log when the client connects successfully
    socket.on('connect', () => {
      console.log('Socket connected with id:', socket.id);
    });

    // Listen for the 'inventoryUpdated' event from the backend
    socket.on('inventoryUpdated', (data) => {
      console.log('Received inventory update:', data);
      setUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    // Simulate a loading delay (or remove if unnecessary)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      socket.off('connect');
      socket.off('inventoryUpdated');
    };
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Main Dashboard</h2>
      <div className="dashboard-cards">
        {/* Existing dashboard cards */}
        <div className="dashboard-card">
          <h3>Projects</h3>
          <p>Manage Projects Inventories</p>
        </div>
        <div className="dashboard-card">
          <h3>Reports</h3>
          <p>View Project-Related Analytics</p>
        </div>
        <div className="dashboard-card">
          <h3>Admin</h3>
          <p>Manage Users and Roles</p>
        </div>
        <div className="dashboard-card">
          <h3>Blank</h3>
          <p>To Be Populated Later</p>
        </div>
      </div>
      {/* Section to display real-time updates */}
      <div className="dashboard-updates">
        <h3>Real-Time Updates</h3>
        {updates.length === 0 ? (
          <p>No updates yet.</p>
        ) : (
          <ul>
            {updates.map((update, index) => (
              <li key={index}>
                Action: {update.action} | Item: {update.item && update.item.name ? update.item.name : 'Unknown'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
