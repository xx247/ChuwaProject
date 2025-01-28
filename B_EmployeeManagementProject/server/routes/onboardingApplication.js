const express = require('express')
const router = express.Router()
const PersonalInfo = require('../models/PersonalInfo');
const User = require('../models/User');
const Application = require('../models/Application');

const getOnboardingApplications = async (req, res) => {
  try {
    const status = req.params.status;
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
        "$match": {
          "application.status": status
        },
      },
      {
        "$project": {
          "_id": 1,
          "username": 1,
          "email": 1,
        },
      },
    ]);
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const changeOnboardingApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const reviewFeedback = req.body.feedback || "";
    const onboardingApplication = await Application.findOneAndUpdate({ _id: id }, { $set: { status: status, feedback: reviewFeedback }}, { new: true });
    res.status(200).json(onboardingApplication);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getFullOnboardingApplicationForReview = async (req, res) => {
  try {
    const id = req.params.id;
    const userProfile = await User.findOne({ _id: id});
    const personalInfoId = userProfile.personalInfo;
    const onboardingApplicationId = userProfile.onboardingApplication;
    const personalInfo = await PersonalInfo.findOne({ _id: personalInfoId });
    const onboardingApplication = await Application.findOne({ _id: onboardingApplicationId });
    res.status(200).json({ personalInfo: personalInfo, documents: onboardingApplication.documents, onboardingApplication: onboardingApplication });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.get('/onboardingApplications/:status', getOnboardingApplications);
router.post('/changeOnboardingApplication/:id', changeOnboardingApplication);
router.get('/getOnboardingApplication/:id', getFullOnboardingApplicationForReview);

module.exports = router