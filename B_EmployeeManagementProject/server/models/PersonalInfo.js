const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePicture: { type: String },
  address: {
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  cellPhone: { type: String, required: true },
  workPhone: { type: String },
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "I do not wish to answer"],
    required: true,
  },
  workAuthorization: {
    visaTitle: { type: String },
    citizenType: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    //files: [{ type: String }], // File paths or URLs
  },
  reference: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String, required: true },
  },
  emergencyContacts: [{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String, required: true },
  }],
});

module.exports = mongoose.model("PersonalInfo", PersonalInfoSchema);
