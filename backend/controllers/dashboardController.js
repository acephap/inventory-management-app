// backend/controllers/dashboardController.js

const Project = require('../models/Project');
const InventoryItem = require('../models/InventoryItem');
const fetch = require('node-fetch'); // Needed if you want to use QuickChart or other external HTTP calls

/**
 * Dashboard Controller
 * 
 * This file contains multiple endpoints to generate and return:
 * 1. Chart-ready data (labels/data arrays) for project inventory distribution.
 * 2. Distribution data with percentages of total inventory.
 * 3. A QuickChart URL for server-side chart generation.
 * 
 * Each function is exported and can be mounted in your dashboardRoutes.js file.
 */

/**
 * getProjectInventoryDistribution
 * --------------------------------
 * Aggregates total inventory per project and returns two arrays:
 * - labels: Project names
 * - data: Total quantity of inventory for each project
 * 
 * Useful for frontend chart libraries (Chart.js, Recharts, etc.)
 */
exports.getProjectInventoryDistribution = async (req, res) => {
  try {
    // Aggregate to sum up total quantity per project
    const results = await InventoryItem.aggregate([
      {
        $group: {
          _id: '$project',
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    // Build arrays for labels (project names) and data (quantities)
    const labels = [];
    const data = [];

    for (const item of results) {
      // Look up the project name
      const project = await Project.findById(item._id).select('name');
      if (project) {
        labels.push(project.name);
        data.push(item.totalQuantity);
      }
    }

    res.json({ labels, data });
  } catch (err) {
    console.error('Error in getProjectInventoryDistribution:', err);
    res.status(500).json({ error: 'Failed to fetch distribution data' });
  }
};

/**
 * getDistributionWithPercentages
 * --------------------------------
 * Similar to getProjectInventoryDistribution, but also calculates the 
 * total inventory across all projects to compute percentages for each.
 */
exports.getDistributionWithPercentages = async (req, res) => {
  try {
    // Compute the grand total of all inventory items
    const totalResult = await InventoryItem.aggregate([
      { $group: { _id: null, grandTotal: { $sum: '$quantity' } } }
    ]);
    const grandTotal = totalResult[0]?.grandTotal || 0;

    // Aggregate total quantity per project
    const results = await InventoryItem.aggregate([
      {
        $group: {
          _id: '$project',
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    // Build an array with projectName, totalQuantity, and percentage
    const distribution = [];
    for (const item of results) {
      const project = await Project.findById(item._id).select('name');
      if (project) {
        const percentage = grandTotal > 0 ? (item.totalQuantity / grandTotal) * 100 : 0;
        distribution.push({
          projectName: project.name,
          totalQuantity: item.totalQuantity,
          percentage: parseFloat(percentage.toFixed(2)) // Round to 2 decimals
        });
      }
    }

    // Return the distribution array along with the grand total
    res.json({
      grandTotal,
      distribution
    });
  } catch (err) {
    console.error('Error in getDistributionWithPercentages:', err);
    res.status(500).json({ error: 'Failed to fetch distribution data' });
  }
};

/**
 * getProjectInventoryChart
 * --------------------------------
 * Generates a chart URL using QuickChart.io that the frontend can display as an <img>.
 * This is a server-side approach to chart generation, returning just the URL.
 */
exports.getProjectInventoryChart = async (req, res) => {
  try {
    // Re-use or compute chart-ready data (labels, data). For brevity, 
    // we can call getChartData() or replicate logic from getProjectInventoryDistribution.
    const { labels, data } = await computeChartData(); // We'll define a helper below

    // Build a Chart.js config
    const chartConfig = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Project Inventory',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Project Inventory Distribution'
        },
        legend: {
          display: false
        }
      }
    };

    // Generate the QuickChart URL
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;

    // Optionally, we could also fetch the image data if we want to return the actual image
    // but returning the URL is usually enough for the frontend to render an <img> tag.
    res.json({ chartUrl });
  } catch (err) {
    console.error('Error in getProjectInventoryChart:', err);
    res.status(500).json({ error: 'Failed to generate chart' });
  }
};

/**
 * Helper function to compute chart data
 * for the getProjectInventoryChart method.
 */
async function computeChartData() {
  const results = await InventoryItem.aggregate([
    {
      $group: {
        _id: '$project',
        totalQuantity: { $sum: '$quantity' }
      }
    }
  ]);

  const labels = [];
  const data = [];

  for (const item of results) {
    const project = await Project.findById(item._id).select('name');
    if (project) {
      labels.push(project.name);
      data.push(item.totalQuantity);
    }
  }

  return { labels, data };
}
