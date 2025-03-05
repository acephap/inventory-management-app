// backend/controllers/inventoryController.js

const InventoryItem = require('../models/InventoryItem');
const redisClient = require('../redisClient'); // Import the Redis client

/**
 * Get all inventory items for a specific project.
 * Checks Redis cache before querying MongoDB.
 */
exports.getInventoryByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const cacheKey = `inventory:${projectId}`;

    // Try to retrieve cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Serving inventory data from cache');
      return res.json(JSON.parse(cachedData));
    }

    // If no cached data, query the database
    const items = await InventoryItem.find({ project: projectId });

    // Save the result in Redis with an expiration time (e.g., 60 seconds)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(items));
    console.log('Serving inventory data from DB and caching the result');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

/**
 * Create a new inventory item for a specific project.
 * Emits a real-time event after creation.
 */
exports.createInventoryItem = async (req, res) => {
  try {
    // Create new inventory item and associate it with the project from the URL
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    const savedItem = await newItem.save();
    // Emit a real-time event for creation
    global.io.emit('inventoryUpdated', { action: 'create', item: savedItem });
    // Invalidate the cache for this project (optional: clear cache so next GET reloads fresh data)
    await redisClient.del(`inventory:${req.params.projectId}`);
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

/**
 * Update an existing inventory item.
 * Emits a real-time update event and invalidates cache.
 */
exports.updateInventoryItem = async (req, res) => {
  try {
    const { id, projectId } = { id: req.params.id, projectId: req.params.projectId };
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    // Emit event for update
    global.io.emit('inventoryUpdated', { action: 'update', item: updatedItem });
    // Invalidate cache for this project
    await redisClient.del(`inventory:${projectId}`);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

/**
 * Delete an inventory item.
 * Emits a real-time deletion event and invalidates cache.
 */
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { id, projectId } = { id: req.params.id, projectId: req.params.projectId };
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    // Emit event for deletion
    global.io.emit('inventoryUpdated', { action: 'delete', item: deletedItem });
    // Invalidate cache for this project
    await redisClient.del(`inventory:${projectId}`);
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};
