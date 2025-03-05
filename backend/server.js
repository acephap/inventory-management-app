// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

// Import Swagger configuration
const { swaggerUi, specs } = require('./swagger');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventorydb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve Swagger docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
// Inventory routes nested under projects. They expect a projectId parameter.
app.use('/api/projects/:projectId/inventory', inventoryRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('Inventory Management App Backend is running');
});

// Centralized error-handling middleware
app.use(errorMiddleware);

// Start the server and integrate Socket.IO
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Initialize Socket.IO
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Adjust as needed for your security requirements
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
global.io = io;

// Broadcast an event when a client connects (for demonstration)
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // You can also handle disconnections:
  socket.on('disconnect', () => {
    console.log('A client disconnected:', socket.id);
  });
});

// Example: Emit an event when a new inventory item is added
// You can modify your createInventoryItem controller to emit events:
const InventoryItem = require('./models/InventoryItem');
const originalCreateInventoryItem = async (req, res) => {
  try {
    const newItem = new InventoryItem({ ...req.body, project: req.params.projectId });
    const savedItem = await newItem.save();
    // Emit the event to all connected clients
    io.emit('inventoryUpdated', { action: 'create', item: savedItem });
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
};

// To use the new functionality, update your inventoryRoutes.js to use originalCreateInventoryItem.