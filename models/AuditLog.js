// backend/models/AuditLog.js

const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  operation: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
  user: { type: String }, // optionally store username or userId
  timestamp: { type: Date, default: Date.now },
  details: { type: Object } // any extra info you want to log
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
