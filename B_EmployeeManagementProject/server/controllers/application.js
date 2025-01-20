const User = require('../models/User');
const Application = require('../models/Application');
const PersonalInfo = require('../models/PersonalInfo');
//const Document = require('../models/Document');


// Submit onboarding application
const submitApplication = async (req, res) => {
  const { personalInfo, profilePicture, documents } = req.body; // Accept profile picture and documents as strings

  try {
    // Find the user
    const user = await User.findById(req.user.id).populate('personalInfo onboardingApplication');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle PersonalInfo
    let personalInfoDoc;
    if (user.personalInfo) {
      // Update existing PersonalInfo document
      personalInfoDoc = await PersonalInfo.findByIdAndUpdate(
        user.personalInfo._id,
        {
          ...personalInfo,
          profilePicture,
        },
        { new: true }
      );
    } else {
      // Create new PersonalInfo document
      personalInfoDoc = new PersonalInfo({
        ...personalInfo,
        profilePicture,
      });
      await personalInfoDoc.save();
      user.personalInfo = personalInfoDoc._id; // Link to the user
    }

    // Handle Application
    let applicationDoc;
    if (user.onboardingApplication) {
      // Update existing Application document
      applicationDoc = await Application.findByIdAndUpdate(
        user.onboardingApplication._id,
        { status: 'Pending', documents },
        { new: true }
      );
    } else {
      // Create new Application document
      applicationDoc = new Application({ status: 'Pending', documents });
      await applicationDoc.save();
      user.onboardingApplication = applicationDoc._id;
    }

    // Save the user
    await user.save();

    res.status(200).json({
      message: 'Application submitted successfully',
      personalInfo: personalInfoDoc,
      application: applicationDoc,
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
  // getOnboardingStatus,
  submitApplication,
//   downloadDocument,
};
