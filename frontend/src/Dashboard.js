// frontend/src/Dashboard.js

import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // CSS for animations, styling, etc.

function Dashboard() {
  // Simulating data load with useState (optional)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Main Dashboard</h2>
      <div className="dashboard-cards">
        {/* 1. Projects Card */}
        <div className="dashboard-card">
          <h3>Projects</h3>
          <p>Manage Projects Inventories</p>
        </div>

        {/* 2. Reports Card */}
        <div className="dashboard-card">
          <h3>Reports</h3>
          <p>View Project-Related Analytics</p>
        </div>

        {/* 3. Admin Card */}
        <div className="dashboard-card">
          <h3>Admin</h3>
          <p>Manage Users and Roles</p>
        </div>

        {/* 4. Blank Card (Placeholder for Future) */}
        <div className="dashboard-card">
          <h3>Blank</h3>
          <p>To Be Populated Later</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
