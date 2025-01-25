const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, default:'username' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'HR'], default: 'Employee' },
  
  //status of application and document submitted
  onboardingApplication: {type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  
  //personal information on application
  personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' },

  //personal information on information page that can be edited by user
  userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' },
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
