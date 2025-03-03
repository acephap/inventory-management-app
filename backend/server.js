// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
