const mongoose = require('mongoose');
const { emit } = require('./User');

const UserInfoSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    preferredName: { type: String },
    profilePicture: { type: String },
    email: { type: String },
    ssn: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: {
        type: String,
        enum: ["Male", "Female", "I do not wish to answer"],
        required: true,
    },
    address: {
        building: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    },
    cellPhone: { type: String, required: true },
    workPhone: { type: String },
    employment:{
        visaTitle: { type: String , default: 'NA'},
        startDate: { type: Date },
        endDate: { type: Date }
    },
    emergencyContacts: [{
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String },
        phone: { type: String },
        email: { type: String },
        relationship: { type: String, required: true },
      }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    email: { type: String, required: true },
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
