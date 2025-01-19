require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const emailRegistrationRoutes = require('../server/routes/emailRegistration');
const onboardingApplicationRoutes = require('../server/routes/onboardingApplication');
const visaStatusesRoutes = require('../server/routes/visaStatuses');
const employeeProfileRoutes = require('../server/routes/employeeProfile');

const app = express();

app.use(cors());
app.use(express.json());

app.use('', emailRegistrationRoutes);
app.use('', onboardingApplicationRoutes);
app.use('', visaStatusesRoutes);
app.use('', employeeProfileRoutes);

//Databse connection
connectDB();

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));