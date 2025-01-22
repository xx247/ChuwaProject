const express = require('express')
const router = express.Router()
const User = require('../models/User');
const Document = require('../models/Document');

const getInProgressEmployeeVisaStatuses = async (req, res) => {
  try {
    const Users = await User.aggregate([
      {
        "$lookup": {
          "from": "applications",
          "localField": "onboardingApplication",
          "foreignField": "_id",
          "as": "application"
        },
      },
      {
        "$unwind": '$application'
      },
      {
        "$lookup": {
          "from": "personalinfos",
          "localField": "personalInfo",
          "foreignField": "_id",
          "as": "personalInfo"
        },
      },
      {
        "$unwind": '$personalInfo'
      },
      {
        "$match": { "$or": [{ "application.status": 'Pending' }, { "application.status": 'NeverSubmitted' }] }
      },
      // {
      //   "$match": { "visaStatus.other": null }
      // }
    ]);
    const employeeProfiles = await Promise.all(Users.map(async (employeeProfile) => {
      const resp = {};
      if (employeeProfile.application.status === 'NeverSubmitted') {
        resp.nextStep = 'Submit Onboarding Application';
      } else {
        // if (employeeProfile.visaStatus.i20) {
        //   resp.nextStep = 'Approve onboarding application';
        // } else if (employeeProfile.visaStatus.i983 || employeeProfile.visaStatus.optEAD || employeeProfile.visaStatus.optReceipt) {
        //   resp.nextStep = 'Submit next documentation';
        // }
      }
      resp.name = employeeProfile.personalInfo.firstName + " " + employeeProfile.personalInfo.lastName;
      resp.workAuthorization = employeeProfile.personalInfo.workAuthorization;
      resp._id = employeeProfile._id;
      return resp;
    }));
    res.status(200).json(employeeProfiles);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getAllEmployeeVisaStatuses = async (req, res) => {
  try {
    const Documents = await Document.aggregate([
      {
        "$lookup": {
          "from": "users",
          "localField": "user",
          "foreignField": "_id",
          "as": "user"
        },
      },
      {
        "$unwind": '$user'
      },
      {
        "$lookup": {
          "from": "personalinfos",
          "localField": "user.personalInfo",
          "foreignField": "_id",
          "as": "personalInfo"
        },
      },
      {
        "$unwind": '$personalInfo'
      },
      {
        "$match": { "status": "Approved" }
      }
    ]);
    const resp = {};
    Documents.forEach((document) => {
      const name = document.personalInfo.firstName + " " + document.personalInfo.lastName;
      const workAuthorization = document.personalInfo.workAuthorization;
      if (name in resp) {
        resp[name].documents.push(document._id)
      } else {
        resp[name] = {};
        resp[name].workAuthorization = workAuthorization;
        resp[name].documents = [document._id];
      }
    });
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
  
router.get('/getInProgressEmployeeVisaStatuses', getInProgressEmployeeVisaStatuses);
router.get('/getAllEmployeeVisaStatuses', getAllEmployeeVisaStatuses);

module.exports = router