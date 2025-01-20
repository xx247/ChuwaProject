const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const {
  getOnboardingStatus,
  submitApplication,
//   downloadDocument,
} = require('../controllers/application');

const router = express.Router();

// Get onboarding status, feedback and documents
router.get('/onboardingStatus', authenticateToken, getOnboardingStatus);

// Submit onboarding application
router.post('/submit', authenticateToken, submitApplication);

// // Download a document
// router.get('/download/:fileName', authenticateToken, downloadDocument);

module.exports = router;
