// backend/routes/inventoryRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getInventoryByProject, createInventoryItem } = require('../controllers/inventoryController');

// GET inventory for a specific project
router.get('/', getInventoryByProject);

// POST a new inventory item for a specific project
router.post('/', createInventoryItem);

// PUT and DELETE endpoints can be added similarly

module.exports = router;
