// frontend/src/Dashboard.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Dashboard.css';

// Connect to your backend Socket.IO server
const socket = io('http://localhost:5000');

function Dashboard() {
  // State to simulate initial loading
  const [loading, setLoading] = useState(true);
  // State to store real-time update events from the backend
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // When the client connects, log its socket ID for debugging purposes
    socket.on('connect', () => {
      console.log('Socket connected with id:', socket.id);
    });

    // Listen for the 'inventoryUpdated' event from the backend
    socket.on('inventoryUpdated', (data) => {
      console.log('Received inventory update:', data);
      setUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    // Simulate a loading delay (you can remove this if you fetch real data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup: remove listeners and clear timeout on component unmount
    return () => {
      clearTimeout(timer);
      socket.off('connect');
      socket.off('inventoryUpdated');
    };
  }, []);

  // If still loading, display a loading message
  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Main Dashboard</h2>
      {/* Dashboard Cards Section */}
      <div className="dashboard-cards">
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

      {/* Real-Time Updates Section */}
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
