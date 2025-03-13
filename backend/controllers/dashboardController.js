// backend/controllers/dashboardController.js

const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');
const User = require('../models/User');

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
