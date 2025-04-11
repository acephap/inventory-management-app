// backend/models/Project.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  // Later, we might add references to users and inventory items:
  // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }]
  
});

module.exports = mongoose.model('Project', ProjectSchema);
