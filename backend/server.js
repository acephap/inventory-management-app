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
  newItem.id = inventoryItems.length + 1;
  inventoryItems.push(newItem);
  res.status(201).json(newItem);
});  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
