// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  generateProjectReport,
  exportInventoryCSV,
  generateInventoryChart
} = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints for generating project reports
 */

/**
 * @swagger
 * /api/projects/{projectId}/report:
 *   get:
 *     summary: Generate a PDF report for a specific project
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to generate a report for
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional start date for filtering inventory
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Optional end date for filtering inventory
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
router.get('/', generateProjectReport);

/**
 * @swagger
 * /api/projects/{projectId}/report/csv:
 *   get:
 *     summary: Export inventory items for a specific project as CSV
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The project id
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
router.get('/csv', exportInventoryCSV);

/**
 * @swagger
 * /api/projects/{projectId}/report/chart:
 *   get:
 *     summary: Generate a chart URL for inventory items of a specific project
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The project id
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
 *       500:
 *         description: Failed to generate chart
 */
router.get('/chart', generateInventoryChart);

module.exports = router;
