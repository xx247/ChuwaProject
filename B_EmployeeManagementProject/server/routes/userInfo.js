const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userInfoController");

const router = express.Router();

// Get user information
router.get("/getUserInfo", authenticateToken, getUserInfo);
// Update user information
router.put("/updateUserInfo", authenticateToken, updateUserInfo);

module.exports = router;
