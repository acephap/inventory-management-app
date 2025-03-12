// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for dashboard analytics and KPIs
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Retrieve dashboard summary statistics.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard summary with aggregated inventory data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventorySummary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The project ID.
 *                       totalQuantity:
 *                         type: number
 *                         description: Total quantity of inventory for the project.
 *                 summaryWithProjectDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       totalQuantity:
 *                         type: number
 *       500:
 *         description: Failed to generate dashboard summary.
 */
router.get('/summary', getDashboardSummary);

module.exports = router;
