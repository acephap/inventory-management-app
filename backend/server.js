// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet'); // Import Helmet for secure headers
const rateLimit = require('express-rate-limit'); // Import rate limiting
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

// =====================
// Middleware Setup
// =====================

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Apply rate limiting to all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// =====================
// Database Connection
// =====================
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventorydb';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// =====================
// Swagger Documentation
// =====================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// =====================
// Mount Routes
// =====================
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/inventory', inventoryRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('Inventory Management App Backend is running');
});

// =====================
// Centralized Error Handling
// =====================
app.use(errorMiddleware);

// =====================
// Start Server and Setup Socket.IO
// =====================
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
