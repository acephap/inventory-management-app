// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const { generateProjectReport } = require('../controllers/reportController');

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
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to generate a report for
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: The start date of the report range (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: The end date of the report range (ISO format)
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

module.exports = router;
