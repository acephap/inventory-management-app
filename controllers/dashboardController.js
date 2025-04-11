// backend/controllers/dashboardController.js

const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');


/**
 * Dashboard Controller
 * 
 * This file contains endpoints that provide real-time statistics and
 * high-level metrics for your inventory system. The example below
 * focuses on counting the total number of projects, total inventory
 * items, and total users.
 */

/**
 * getDashboardSummary
 * -------------------
 * Returns a JSON object containing:
 *  - totalProjects: The total number of Project documents
 *  - totalInventoryItems: The total number of InventoryItem documents
 *  - totalUsers: The total number of User documents
 * 
 * This summary can be displayed in dashboard tiles/cards on the frontend.
 */
exports.getDashboardSummary = async (req, res) => {
  try {
    // Count the total number of projects in the database
    const totalProjects = await Project.countDocuments({});

    // Count the total number of inventory items
    const totalInventoryItems = await InventoryItem.countDocuments({});

    // Count the total number of users
    const totalUsers = await User.countDocuments({});

    // Respond with a summary object
    res.json({
      totalProjects,
      totalInventoryItems,
      totalUsers
    });
  } catch (err) {
    console.error('Error generating dashboard summary:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
};

/**
 * getRecentActivity
 * -----------------
 * Retrieves the most recent audit log entries from the AuditLog collection.
 * It sorts the logs in descending order by timestamp and returns the latest 10 entries.
 *
 * @returns {JSON} An array of recent audit log entries.
 */
exports.getRecentActivity = async (req, res) => {
  try {
    // Fetch the most recent 10 audit log entries, sorted by timestamp (newest first)
    const recentLogs = await AuditLog.find({})
      .sort({ timestamp: -1 })
      .limit(10);
      
    res.json(recentLogs);
  } catch (err) {
    console.error('Error fetching recent activity logs:', err);
    res.status(500).json({ error: 'Failed to fetch recent activity logs' });
  }
};