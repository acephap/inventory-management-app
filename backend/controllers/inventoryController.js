// backend/controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');

/**
 * Get all inventory items for a specific project.
 * Reads the project ID from req.params.projectId and returns matching items.
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
 * Associates the new item with the project (using req.params.projectId),
 * saves it to the database, emits a real-time event, and returns the saved item.
 */
exports.createInventoryItem = async (req, res) => {
  try {
    // Create new inventory item with project association from URL parameter
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    const savedItem = await newItem.save();
    // Emit a real-time event for creation using global.io
    global.io.emit('inventoryUpdated', { action: 'create', item: savedItem });
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

/**
 * Update an existing inventory item.
 * Finds the item by its ID (req.params.id), updates it with the request body,
 * emits a real-time update event, and returns the updated item.
 */
exports.updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    // Emit a real-time event for update
    global.io.emit('inventoryUpdated', { action: 'update', item: updatedItem });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

/**
 * Delete an inventory item.
 * Finds the inventory item by its ID (req.params.id), deletes it,
 * emits a real-time delete event, and returns the deleted item.
 */
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    // Emit a real-time event for deletion
    global.io.emit('inventoryUpdated', { action: 'delete', item: deletedItem });
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};
