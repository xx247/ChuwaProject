const express = require('express')
const router = express.Router()
const UserInfo = require('../models/UserInfo');

const getEmployeeProfiles = async (req, res) => {
  try {
    const PersonalInfos = await UserInfo.find({});
    const employeeProfiles = PersonalInfos.map((employeeProfile) => {
      return {profile_id: employeeProfile._id, firstName: employeeProfile.firstName, lastName: employeeProfile.lastName, preferredName: employeeProfile.preferredName,
        SSN: employeeProfile.ssn, authorization: employeeProfile.employment.visaTitle,
      phone: employeeProfile.cellPhone, email: employeeProfile.email};
    });
    const employeeProfilesSorted = employeeProfiles.sort(function(e1, e2) {
      return e1.lastName.localeCompare(e2.lastName);
    });
    res.status(200).json(employeeProfilesSorted);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getEmployeeProfileDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeProfile = await UserInfo.findOne({ _id: id });
    res.status(200).json(employeeProfile);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.get('/getEmployeeProfiles', getEmployeeProfiles);
router.get('/getEmployeeProfileDetails/:id', getEmployeeProfileDetailsById);

module.exports = router