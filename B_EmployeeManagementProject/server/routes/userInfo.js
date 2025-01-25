const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const { getUserInfo } = require('../controllers/userInfoController');

const router = express.Router();

// Get user information
router.get('/getUserInfo', authenticateToken, getUserInfo);

module.exports = router;