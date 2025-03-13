// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const {
  generateProjectReport,
  exportInventoryCSV,
  importInventoryCSV,
  generateInventoryChart
} = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for dashboard analytics, report generation, and bulk import/export
 */

/**
 * @swagger
 * /api/dashboard/report/{projectId}:
 *   get:
 *     summary: Generate a PDF report for a specific project
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional start date for filtering inventory items
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional end date for filtering inventory items
 *     responses:
 *       200:
 *         description: PDF report generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to generate report
 */
router.get('/report/:projectId', generateProjectReport);

/**
 * @swagger
 * /api/dashboard/report/{projectId}/csv:
 *   get:
 *     summary: Export inventory items for a specific project as CSV
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: CSV file generated successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Failed to export CSV
 */
router.get('/report/:projectId/csv', exportInventoryCSV);

/**
 * @swagger
 * /api/dashboard/report/{projectId}/import:
 *   post:
 *     summary: Import inventory items for a specific project from a CSV file
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file containing inventory data
 *     responses:
 *       201:
 *         description: Inventory items imported successfully
 *       400:
 *         description: No file provided or invalid file format
 *       500:
 *         description: Failed to import CSV data
 */
router.post('/report/:projectId/import', importInventoryCSV);

/**
 * @swagger
 * /api/dashboard/chart/{projectId}:
 *   get:
 *     summary: Generate a QuickChart URL for a chart of inventory items for a specific project
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: Chart URL generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chartUrl:
 *                   type: string
 *                   description: URL to the generated chart image
 *       500:
 *         description: Failed to generate chart
 */
router.get('/chart/:projectId', generateInventoryChart);

module.exports = router;
