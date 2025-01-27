const express = require('express')
const router = express.Router()
const User = require('../models/User');
const Document = require('../models/Document');
const transporter = require('../config/nodemailer');

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
        "$match": { 
          "$and": [
            { "$or": [{ "application.status": 'Pending' }, { "application.status": 'NeverSubmitted' }] },
            { "visaStatus.other": null },
            { "role": "Employee" },
          ]
        }
      },
    ]);
    const employeeProfiles = await Promise.all(Users.map(async (employeeProfile) => {
      const resp = {};
      if (employeeProfile.application.status === 'NeverSubmitted') {
        resp.nextStep = 'Submit Onboarding Application';
      } else if (employeeProfile.visaStatus?.i20) {
        resp.nextStep = 'Review and Approve Visa Status';
        resp.recentDocument = employeeProfile.visaStatus?.i20;
      } else if (employeeProfile.visaStatus?.i983) {
        resp.nextStep = 'Review Document and Submit i20';
        resp.recentDocument = employeeProfile.visaStatus?.i983;
      } else if (employeeProfile.visaStatus?.optEAD) {
        resp.nextStep = 'Review Document and Submit i983';
        resp.recentDocument = employeeProfile.visaStatus?.optEAD;
      } else if (employeeProfile.visaStatus?.optReceipt) {
        resp.nextStep = 'Review Document and Submit opt EAD';
        resp.recentDocument = employeeProfile.visaStatus?.optReceipt;
      } else {
        resp.nextStep = 'Review Document and Submit opt receipt';
      }
      resp.name = employeeProfile.personalInfo.firstName + " " + employeeProfile.personalInfo.lastName;
      resp.workAuthorization = employeeProfile.personalInfo.workAuthorization;
      resp._id = employeeProfile._id;
      resp.visaStatus = employeeProfile.visaStatus;
      resp.email = employeeProfile.personalInfo.email;
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

const changeEmployeeVisaDocuments = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const feedback = req.body.feedback;
    const document = await Document.findOne({ _id: id });
    document.status = status;
    document.feedback = feedback;
    document.save();
    res.status(200).json(document);
  } catch {
    res.status(500).json({ message: err });
  }
}

const sendNotification = async (req, res) => {
  try {
    const email = req.params.email;
    const message = req.body.message;
    await transporter.sendMail({
      from: '"Ziwei" <topveronicaa@gmail.com>',
      to: email,
      subject: "Application Status",
      html: `<div>Please view your uploaded file status and the next steps, the next step is: ${message}</div>`, 
    });
    res.status(200).json({});
  } catch {
    res.status(500).json({ message: err });
  }
}

router.get('/getInProgressEmployeeVisaStatuses', getInProgressEmployeeVisaStatuses);
router.get('/getAllEmployeeVisaStatuses', getAllEmployeeVisaStatuses);
router.post('/changeEmployeeVisaDocuments/:id', changeEmployeeVisaDocuments);
router.get('/sendNotification/:email', sendNotification);

module.exports = router