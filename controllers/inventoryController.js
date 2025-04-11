// backend/controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');
const AuditLog = require('../models/AuditLog');

/**
 * Get all inventory items for a specific project.
 * Retrieves all inventory items that belong to the project specified in the URL.
 */
exports.getInventoryByProject = async (req, res) => {
  try {
    // Query the database for inventory items with the specified project ID
    const items = await InventoryItem.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    console.error('Error fetching inventory items:', err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

/**
 * Create a new inventory item for a specific project.
 * - Creates and saves a new inventory item associated with the project from the URL.
 * - Emits a real-time event to connected clients.
 * - Logs the creation operation in the AuditLog.
 */
exports.createInventoryItem = async (req, res) => {
  try {
    // Create a new inventory item object, associating it with the project ID from the URL parameters
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    // Save the new item to the database
    const savedItem = await newItem.save();
    
    // Emit a real-time event (using Socket.IO) for the new item creation
    global.io.emit('inventoryUpdated', { action: 'create', item: savedItem });
    
    // Log the creation operation in the AuditLog
    await AuditLog.create({
      collection: 'InventoryItem',
      documentId: savedItem._id,
      operation: 'CREATE',
      user: req.user ? req.user.username : 'Unknown', // If available, use authenticated user's username
      details: savedItem.toObject(),
      timestamp: new Date()
    });
    
    // Respond with the saved item
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error creating inventory item:', err);
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

/**
 * Update an existing inventory item.
 * - Updates an inventory item identified by req.params.id with the new data from req.body.
 * - Emits a real-time event for the update.
 * - Logs the update operation in the AuditLog.
 */
exports.updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the inventory item by ID and update it; return the updated document
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    
    // Emit a real-time event for the update
    global.io.emit('inventoryUpdated', { action: 'update', item: updatedItem });
    
    // Log the update operation in the AuditLog
    await AuditLog.create({
      collection: 'InventoryItem',
      documentId: updatedItem._id,
      operation: 'UPDATE',
      user: req.user ? req.user.username : 'Unknown',
      details: updatedItem.toObject(),
      timestamp: new Date()
    });
    
    // Respond with the updated item
    res.json(updatedItem);
  } catch (err) {
    console.error('Error updating inventory item:', err);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

/**
 * Delete an inventory item.
 * - Deletes the inventory item identified by req.params.id.
 * - Emits a real-time event for the deletion.
 * - Logs the deletion operation in the AuditLog.
 */
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Find and delete the inventory item by its ID
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    
    // Emit a real-time event for deletion
    global.io.emit('inventoryUpdated', { action: 'delete', item: deletedItem });
    
    // Log the deletion operation in the AuditLog
    await AuditLog.create({
      collection: 'InventoryItem',
      documentId: deletedItem._id,
      operation: 'DELETE',
      user: req.user ? req.user.username : 'Unknown',
      details: deletedItem.toObject(),
      timestamp: new Date()
    });
    
    // Respond with the deleted item data
    res.json(deletedItem);
  } catch (err) {
    console.error('Error deleting inventory item:', err);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};
