// backend/controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');

exports.getInventoryByProject = async (req, res) => {
  try {
    const items = await InventoryItem.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.createInventoryItem = async (req, res) => {
  try {
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

// Additional endpoints for PUT and DELETE can be similarly implemented
