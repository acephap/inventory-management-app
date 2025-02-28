// backend/server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Inventory Management App Backend is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
