// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['manager', 'accountant', 'data-manager', 'logistic-officer'], 
    default: 'manager' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
