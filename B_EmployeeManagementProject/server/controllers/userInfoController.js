const User = require('../models/User');


const getUserInfo = async (req, res) => {
  try {
    // Find the user and populate their onboarding application
    const user = await User.findById(req.user.id).populate('userInfo');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = user.userInfo;

    if (!userInfo) {
      // Case: Never Submitted
      return res.status(404).json({
        message: 'No information submitted yet.'
      });
    }else{
      return res.status(200).json({
        message: 'User information retrieved successfully',
        userInfo
      });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
    getUserInfo
};