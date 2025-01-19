const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, default:'username' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'HR'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  reviewStatus: { type: String, enum: ['Pending', 'Rejected', 'Approved', 'Missing Onboarding Reviews'], default: 'Missing Onboarding Reviews' },
  reviewFeedback: { type: String },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
