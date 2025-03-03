// backend/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getInventoryByProject, createInventoryItem } = require('../controllers/inventoryController');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Endpoints for managing inventory items for a project
 */

/**
 * @swagger
 * /api/projects/{projectId}/inventory:
 *   get:
 *     summary: Get inventory items for a specific project
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: A list of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       500:
 *         description: Failed to fetch inventory
 */
// GET inventory for a specific project
router.get('/', getInventoryByProject);

/**
 * @swagger
 * /api/projects/{projectId}/inventory:
 *   post:
 *     summary: Create a new inventory item for a specific project
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *       500:
 *         description: Failed to add inventory item
 */
// POST a new inventory item for a specific project
router.post('/', createInventoryItem);

// PUT and DELETE endpoints can be added similarly

module.exports = router;
