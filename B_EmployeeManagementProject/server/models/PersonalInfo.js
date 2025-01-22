const mongoose = require('mongoose');

const PersonalInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
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
  },
  cellPhone: { type: String, required: true },
  workPhone: String,
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
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