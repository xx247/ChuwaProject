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
  },
  contactInfo: {
    cellPhone: String,
    workPhone: String,
  },
  ssn: String,
  dob: Date,
  gender: { type: String, enum: ['Male', 'Female', 'I do not wish to answer'] },
  employmentDetails: {
    visaStatus: String,
    visaStartDate: Date,
    visaEndDate: Date,
  },
});

module.exports = mongoose.model('PersonalInfo', PersonalInfoSchema);