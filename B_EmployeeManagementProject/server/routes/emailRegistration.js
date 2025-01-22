const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const EmailRegistration = require('../models/EmailRegistration');

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
      // send email
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

router.get('/emailRegistration/:name/:email', getEmailRegistrationLink);
router.get('/emailRegistartions', getEmailRegistrations);

module.exports = router