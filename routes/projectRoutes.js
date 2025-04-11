// backend/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
// Import the authentication middleware and role-based middleware
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints for managing projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retrieve all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Failed to fetch projects
 */
// GET all projects
router.get('/', authMiddleware, getProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Failed to create project
 */
// POST create a new project
router.post('/', authMiddleware, createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to update project
 */
// PUT update a project by id
router.put('/:id', authMiddleware, requireRole('manager'), updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to delete project
 */
// DELETE a project by id
router.delete('/:id', authMiddleware, requireRole('manager'), deleteProject);

module.exports = router;
