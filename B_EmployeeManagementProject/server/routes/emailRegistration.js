const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const EmailRegistration = require('../models/EmailRegistration');
const transporter = require('../config/nodemailer');

const getEmailRegistrationLink = async (req, res) => {
  try {
    const name = req.params.name;
    const email = req.params.email;
    const token = crypto.randomBytes(10).toString('hex');
    const resp = await EmailRegistration.findOne({ 'email': email });
    const dateNow = new Date();
    const validUntil = dateNow.setHours(dateNow.getHours() + 3);
    
    if (!resp) {
      const emailRegistration = new EmailRegistration({ name: name, email: email, link: token, validUntil: validUntil, registered: false });
      await emailRegistration.save();
      await transporter.sendMail({
        from: '"Ziwei" <topveronicaa@gmail.com>',
        to: email,
        subject: "Registration",
        html: `<div>Please use the token to register: ${token}</div>`, 
      });
      res.status(200).json(emailRegistration);
    } else {
      res.status(400).json({ message: "email already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getEmailRegistrations = async (req, res) => {
  try {
    const emailRegistartions = await EmailRegistration.find({});
    res.status(200).json(emailRegistartions);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const getEmailRegistration = async (req, res) => {
  try {
    const token = req.params.token;
    const emailRegistartion = await EmailRegistration.findOne({ link: token });
    const datetimeNow = Date.now();
    if (datetimeNow <= emailRegistartion.validUntil && !emailRegistartion.registered) {
      res.status(200).json(emailRegistartion);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

const registerEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const emailRegistartion = await EmailRegistration.findOne({ link: token });
    emailRegistartion.registered = true;
    await emailRegistartion.save();
    res.status(200).json(emailRegistartion);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.get('/emailRegistration/:name/:email', getEmailRegistrationLink);
router.get('/emailRegistartions', getEmailRegistrations);
router.get('/emailRegistartion/:token', getEmailRegistration);
router.post('/registerEmail/:token', registerEmail);

module.exports = router