const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const {
   getVisaStatus,
} = require('../controllers/visaStatusController');

const router = express.Router();

// Get visa status
router.get('/getVisaStatus', authenticateToken, getVisaStatus);
//router.get('/getVisaStatus', getVisaStatus);



module.exports = router;
