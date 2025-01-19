const express = require('express')
const router = express.Router()
const PersonalInfo = require('../models/PersonalInfo');

const getEmployeeProfiles = async (req, res) => {
  try {
    const PersonalInfos = await PersonalInfo.find({});
    const employeeProfiles = PersonalInfos.map((employeeProfile) => {
      return {id: employeeProfile._id, name: employeeProfile.firstName + " " + employeeProfile.lastName, preferredName: employeeProfile.preferredName,
        SSN: employeeProfile.ssn, authorization: employeeProfile.employmentDetails.visaStatus,
      phone: employeeProfile.contactInfo.cellPhone, email: employeeProfile.email};
    });
    res.status(200).json(employeeProfiles);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getEmployeeProfileDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeProfile = await PersonalInfo.find({ _id: id });
    res.status(200).json(employeeProfile);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.get('/getEmployeeProfiles', getEmployeeProfiles);
router.get('/getEmployeeProfileDetails/:id', getEmployeeProfileDetailsById);

module.exports = router