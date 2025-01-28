const mongoose = require('mongoose');

const emailRegistrationSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  validUntil: { type: Date },
  registered: { type: Boolean },
});

module.exports = mongoose.model('EmailRegistration', emailRegistrationSchema);