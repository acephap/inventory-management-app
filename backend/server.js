// backend/server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS (for development, to allow frontend requests)
const cors = require('cors');
app.use(cors());
app.use(express.json());



// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Inventory Management App Backend is running');
});

// Dummy inventory data
const inventoryItems = [
    { id: 1, name: 'Item A', quantity: 100 },
    { id: 2, name: 'Item B', quantity: 200 },
    { id: 3, name: 'Item C', quantity: 150 }
  ];

  // Inventory API endpoint
app.get('/api/inventory', (req, res) => {
    res.json(inventoryItems);
  });

// POST endpoint to add a new inventory item
app.post('/api/inventory', (req, res) => {
  const newItem = req.body;
  // For simplicity, assign a new id by incrementing the length
  newItem.id = Date.now();  // Generates a unique number based on the current time
  inventoryItems.push(newItem);
  res.status(201).json(newItem);
});

// PUT endpoint to update an existing inventory item
app.put('/api/inventory/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;
  const index = inventoryItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    // Merge updated fields into the existing item
    inventoryItems[index] = { ...inventoryItems[index], ...updatedData };
    res.json(inventoryItems[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE endpoint to remove an inventory item by id
app.delete('/api/inventory/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = inventoryItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    const deletedItem = inventoryItems.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
