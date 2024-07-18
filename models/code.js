// models/code.js
const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  phoneNumber: String,
  description: String,
  codeUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Code', codeSchema);
