// backend/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getInventoryByProject,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} = require('../controllers/inventoryController');

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       500:
 *         description: Failed to add inventory item
 */
router.post('/', createInventoryItem);

/**
 * @swagger
 * /api/projects/{projectId}/inventory/{id}:
 *   put:
 *     summary: Update an existing inventory item for a specific project
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Failed to update inventory item
 */
router.put('/:id', updateInventoryItem);

/**
 * @swagger
 * /api/projects/{projectId}/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item for a specific project
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory item id
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Failed to delete inventory item
 */
router.delete('/:id', deleteInventoryItem);

module.exports = router;
