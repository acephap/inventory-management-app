// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { 
  getDashboardSummary,
  getRecentActivity
} = require('../controllers/dashboardController');

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

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for dashboard analytics, report generation, and audit logging
 */

/**
 * @swagger
 * /api/dashboard/recent-activity:
 *   get:
 *     summary: Retrieve recent activity logs (audit logs)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: An array of recent audit log entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   collection:
 *                     type: string
 *                   documentId:
 *                     type: string
 *                   operation:
 *                     type: string
 *                     description: The type of operation (CREATE, UPDATE, DELETE)
 *                   user:
 *                     type: string
 *                     description: The user who performed the operation
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   details:
 *                     type: object
 *                     description: Additional details about the operation
 *       500:
 *         description: Failed to fetch recent activity logs.
 */
router.get('/recent-activity', getRecentActivity);

module.exports = router;
