// backend/controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');

/**
 * Get all inventory items for a specific project.
 */
exports.getInventoryByProject = async (req, res) => {
  try {
    const items = await InventoryItem.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

/**
 * Create a new inventory item for a specific project.
 */
exports.createInventoryItem = async (req, res) => {
  try {
    // Create new inventory item and associate it with the project from the URL
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    const savedItem = await newItem.save();
    // Emit an event (make sure `io` is accessible here, or use an event emitter)
    global.io.emit('inventoryUpdated', { action: 'create', item: savedItem });
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

/**
 * Update an existing inventory item.
 */
exports.updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the inventory item by id and update with the provided data, returning the new document
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

/**
 * Delete an inventory item.
 */
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the inventory item by id and delete it
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};
