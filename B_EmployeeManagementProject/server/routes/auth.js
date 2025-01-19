const express = require('express');
const { validateSignup, validateLogin } = require('../validators/auth');
const { signup, login } = require('../controllers/authController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');


const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
