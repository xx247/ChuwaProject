const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  fileName: String,
  type: String, // Driver's license, work authorization, etc.
  filePath: String, // Path to the uploaded file or cloud URL
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  feedback: String,
});

module.exports = mongoose.model('Document', DocumentSchema);