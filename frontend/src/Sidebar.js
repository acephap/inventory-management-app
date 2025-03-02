import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Imported new icons
import './Sidebar.css';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="collapse-btn">
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
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
            <FaSignOutAlt className="icon" /> {/* Sign out icon */}
            Sign Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
