// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProjectInventoryDistribution,
  getDistributionWithPercentages,
  getProjectInventoryChart
} = require('../controllers/dashboardController');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for dashboard analytics and KPIs
 */

/**
 * @swagger
 * /api/dashboard/distribution:
 *   get:
 *     summary: Retrieve chart-ready data (labels, data) for project inventory distribution
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Chart data for project distribution
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of project names
 *                 data:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: Corresponding total inventory quantity
 *       500:
 *         description: Failed to fetch distribution data
 */
router.get('/distribution', getProjectInventoryDistribution);

/**
 * @swagger
 * /api/dashboard/distribution-percentages:
 *   get:
 *     summary: Retrieve distribution data with percentages for each project
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Distribution data with total inventory and percentages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grandTotal:
 *                   type: number
 *                   description: The sum of all inventory items across projects
 *                 distribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       projectName:
 *                         type: string
 *                         description: Name of the project
 *                       totalQuantity:
 *                         type: number
 *                         description: Total quantity of inventory items
 *                       percentage:
 *                         type: number
 *                         description: Percentage of grandTotal
 *       500:
 *         description: Failed to fetch distribution data
 */
router.get('/distribution-percentages', getDistributionWithPercentages);

/**
 * @swagger
 * /api/dashboard/chart:
 *   get:
 *     summary: Generate a QuickChart URL for a server-side rendered chart
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Returns a URL that can be embedded as an <img> for the chart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartUrl:
 *                   type: string
 *                   description: URL to a generated chart image
 *       500:
 *         description: Failed to generate chart
 */
router.get('/chart', getProjectInventoryChart);

module.exports = router;
