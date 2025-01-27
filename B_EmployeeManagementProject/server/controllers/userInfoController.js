const User = require("../models/User");
const UserInfo = require("../models/UserInfo");

const getUserInfo = async (req, res) => {
  try {
    // Find the user and populate their onboarding application
    const user = await User.findById(req.user.id).populate("userInfo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = user.userInfo;

    if (!userInfo) {
      // Case: Never Submitted
      return res.status(404).json({
        message: "No information submitted yet.",
      });
    } else {
      return res.status(200).json({
        message: "User information retrieved successfully",
        userInfo,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const {userInfo} = req.body;
    console.log(userInfo);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the user and update their information
    const userInfoId = user.userInfo;
    const updatedUserInfo = await UserInfo.findByIdAndUpdate(
      userInfoId,
      userInfo,
      { new: true }
    );
    if (!updatedUserInfo)
      return res.status(404).json({ message: "User information not found" });

    res.status(200).json({
      message: "User information updated successfully",
      userInfo: updatedUserInfo,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  getUserInfo,
  updateUserInfo,
};
