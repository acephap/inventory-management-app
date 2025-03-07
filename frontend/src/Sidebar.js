// frontend/src/Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importing icons from react-icons for visual navigation cues
import { FaHome, FaProjectDiagram, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

/**
 * Sidebar Component
 *
 * Provides a collapsible sidebar with navigation links to various parts of the application.
 * Users can collapse/expand the sidebar to maximize screen space.
 *
 * Features:
 * - Collapsible functionality using a state variable.
 * - Navigation links with corresponding icons.
 */
function Sidebar() {
  // isCollapsed determines whether the sidebar is in a collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // Apply the 'collapsed' CSS class conditionally
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>

      {/* Button to toggle the collapsed state */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="collapse-btn">
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>

      {/* Navigation links */}
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FaHome className="icon" /> {/* Home icon */}
            Home
          </Link>
        </li>
        <li>
          <Link to="/projects">
            <FaProjectDiagram className="icon" /> {/* Projects icon */}
            Projects
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FaChartBar className="icon" /> {/* Reports icon */}
            Reports
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <FaUser className="icon" /> {/* Admin icon */}
            Admin
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> {/* Settings icon */}
            Settings
          </Link>
        </li>
        <li>
          <Link to="/signout">
            <FaSignOutAlt className="icon" /> {/* Sign Out icon */}
            Sign Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
