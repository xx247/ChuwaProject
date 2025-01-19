const mongoose = require('mongoose');

const PersonalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  preferredName: String,
  profilePicture: String,
  address: {
    building: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    required: true
  },
  cellPhone: {String, required:true},
  workPhone: String,
  ssn: {String, required:true},
  dob: {Date, required:true},
  gender: { type: String, enum: ['Male', 'Female', 'I do not wish to answer'], required:true},
  citizenshipStatus: {
    type: String,
    // work authorization
    enum: ['Green Card', 'Citizen', 'H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'],
    required:true
  },
  workAuthorization: {
    visaTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    files: [{ type: String }], // File paths or URLs
  },
  reference: {
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String, required:true },
  },
  emergencyContacts: 
    {
      firstName: { type: String, required:true },
      lastName: { type: String, required:true },
      middleName: { type: String },
      phone: { type: String },
      email: { type: String },
      relationship: { type: String, required:true },
    }
});

module.exports = mongoose.model('PersonalInfo', PersonalInfoSchema);