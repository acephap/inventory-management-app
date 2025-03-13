// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Retrieve high-level summary counts for the dashboard (projects, inventory, users)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Summary of counts by entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProjects:
 *                   type: number
 *                 totalInventoryItems:
 *                   type: number
 *                 totalUsers:
 *                   type: number
 *       500:
 *         description: Failed to fetch dashboard summary
 */
router.get('/summary', getDashboardSummary);

module.exports = router;
