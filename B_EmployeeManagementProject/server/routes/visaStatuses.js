const express = require('express')
const router = express.Router()
const User = require('../models/User');
const Application = require('../models/Application');

const getEmployeeVisaStatuses = async (req, res) => {
  try {
    const Users = await User.find({});
    const employeeProfiles = Users.map(async (employeeProfile) => {
      const application = await Application.find({ _id: employeeProfile.onboardingApplication });
      return { application };
    });
    res.status(200).json(employeeProfiles);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
  
router.get('/getEmployeeVisaStatuses', getEmployeeVisaStatuses);

module.exports = router