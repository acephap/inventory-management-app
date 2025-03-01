// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
const mongoURI = 'mongodb://localhost:27017/inventorydb'; // for local MongoDB
// const mongoURI = 'your-mongodb-atlas-connection-string';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import the InventoryItem model
const InventoryItem = require('./models/InventoryItem');

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Inventory Management App Backend is running');
});

// GET endpoint: Fetch all inventory items
app.get('/api/inventory', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// POST endpoint: Add a new inventory item
app.post('/api/inventory', async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
});

// PUT endpoint: Update an existing inventory item
app.put('/api/inventory/:id', async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

// DELETE endpoint: Remove an inventory item by id
app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      res.json(deletedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
