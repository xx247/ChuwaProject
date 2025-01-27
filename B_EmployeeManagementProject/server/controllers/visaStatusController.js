const User = require("../models/User");
const VisaStatus = require("../models/User");

const getVisaStatus = async (req, res) => {
    try {
        // Find the user and populate their visa status
        const user = await User.findById(req.user.id).populate("visaStatus visaStatus.optReceipt visaStatus.optEAD visaStatus.i983 visaStatus.i20");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const visaStatus = user.visaStatus;
    
        if (!visaStatus) {
          // Case: Never Submitted
          return res.status(404).json({
            message: "No document submitted yet.",
          });
        } else {
          return res.status(200).json({
            message: "User visa retrieved successfully",
            visaStatus,
          });
        }
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
};

module.exports = {
    getVisaStatus,
  };