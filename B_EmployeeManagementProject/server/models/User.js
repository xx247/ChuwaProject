const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, default:'username' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'HR'], default: 'Employee' },
  onboardingApplication: {type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' },
  visaStatus: {
    optReceipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    optEAD: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    i983: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    i20: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
