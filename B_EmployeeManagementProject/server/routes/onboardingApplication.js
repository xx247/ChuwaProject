const express = require('express')
const router = express.Router()
const PersonalInfo = require('../models/PersonalInfo');
const User = require('../models/User');
const Document = require('../models/Document');

const getOnboardingApplications = async (req, res) => {
  try {
    const status = req.params.status;
    const userProfiles = await User.find({ reviewStatus: status });
    const applications = userProfiles.map((userProfile) => {
        return {id: userProfile._id, name: userProfile.name, email: userProfile.email};
    });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const changeOnboardingApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const reviewFeedback = req.body.feedback ? req.body.feedback : "";
    const onboardingApplication = await User.findOneAndUpdate({ _id: id }, { $set: { reviewStatus: status, reviewFeedback: reviewFeedback }}, { new: true });
    res.status(200).json(onboardingApplication);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getFullOnboardingApplicationForReview = async (req, res) => {
  try {
    const id = req.params.id;
    const userProfile = await User.find({ _id: id});
    const personalInfoId = userProfile.personalInfo;
    const documentsIds = userProfile.documents;
    const personalInfo = await PersonalInfo.find({ _id: personalInfoId });
    const documents = documentsIds.map(async (documentId) => {
      return await Document.find({ _id: documentId});
    })
    res.status(200).json({ personalInfo: personalInfo, documents: documents });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.get('/onboardingApplications/:status', getOnboardingApplications);
router.post('/changeOnboardingApplication/:id', changeOnboardingApplication);
router.get('/getOnboardingApplication/:id', getFullOnboardingApplicationForReview);

module.exports = router