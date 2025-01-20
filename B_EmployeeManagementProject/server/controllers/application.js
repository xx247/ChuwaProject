const User = require('../models/User');
const Application = require('../models/Application');
const PersonalInfo = require('../models/PersonalInfo');



const getOnboardingStatus = async (req, res) => {
  try {
    // Find the user and populate onboardingApplication and personalInfo
    const user = await User.findById(req.user.id)
      .populate({
        path: 'onboardingApplication',
        populate: { path: 'documents' }, // Populate documents inside the application
      })
      .populate('personalInfo'); // Populate personalInfo details

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has an onboarding application
    if (!user.onboardingApplication) {
      return res.status(200).json({
        onboardingStatus: 'NeverSubmitted',
        message: 'No application has been submitted yet.',
        personalInfo: user.personalInfo || null, // Include personal info if available
      });
    }

    // Extract application details
    const { status, feedback, documents } = user.onboardingApplication;

    // Response structure
    res.status(200).json({
      onboardingStatus: status,
      feedback,
      documents, // Array of document references
      personalInfo: user.personalInfo || null, // Include personal info
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Submit onboarding application
const submitApplication = async (req, res) => {
    const {
      personalInfo, // Contains PersonalInfo fields
      documents,    // Array of document file paths (uploaded earlier)
    } = req.body;

    try {
      // Find the user
      const user = await User.findById(req.user.id).populate('onboardingApplication personalInfo');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Handle PersonalInfo
      let personalInfoDoc;
      if (user.personalInfo) {
        // Update existing PersonalInfo document
        personalInfoDoc = await PersonalInfo.findByIdAndUpdate(user.personalInfo._id, personalInfo, { new: true });
      } else {
        // Create new PersonalInfo document

        personalInfoDoc = new PersonalInfo(personalInfo);
        await personalInfoDoc.save();
        user.personalInfo = personalInfoDoc._id;
      }
  
      // Handle Application
      let applicationDoc;
      if (user.onboardingApplication) {
        // Update existing Application document
        applicationDoc = await Application.findById(user.onboardingApplication._id);
        applicationDoc.status = 'Pending';
        applicationDoc.feedback = ''; // Clear previous feedback
        applicationDoc.documents = documents; // Link uploaded documents
        await applicationDoc.save();
      } else {
        // Create new Application document
        applicationDoc = new Application({
          status: 'Pending',
          documents,
        });
        await applicationDoc.save();
        user.onboardingApplication = applicationDoc._id;
      }
  
      // Save the user
      await user.save();
  
      res.status(200).json({
        message: 'Application submitted successfully',
        application: applicationDoc,
        personalInfo: personalInfoDoc,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// // Download document
// const downloadDocument = async (req, res) => {
//   const { fileName } = req.params;
//   const filePath = `path_to_files/${fileName}`; // Replace with actual file path logic

//   res.download(filePath, (err) => {
//     if (err) {
//       res.status(500).json({ message: 'File not found' });
//     }
//   });
// };

module.exports = {
  getOnboardingStatus,
  submitApplication,
//   downloadDocument,
};
