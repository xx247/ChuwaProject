require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const documentRoutes = require('./routes/mdbFiles');
const userInfoRoutes = require('./routes/userInfo');
const visaStatusRoutes = require('./routes/visaStatus');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const emailRegistrationRoutes = require('../server/routes/emailRegistration');
const onboardingApplicationRoutes = require('../server/routes/onboardingApplication');
const visaStatusesRoutes = require('../server/routes/visaStatuses');
const employeeProfileRoutes = require('../server/routes/employeeProfile');
const previewDocumentsRoutes = require('../server/routes/previewDocuments');

const app = express();

app.use(cors());
app.use(express.json());

//Databse connection
connectDB();
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();

// Middleware for parsing request body and logging requests
app.use(bodyParser.json());
//app.use(logger("dev"));

// Routes
app.use('/', authRoutes);
app.use('/application', applicationRoutes);
app.use('/document', documentRoutes);
app.use('/userInfo', userInfoRoutes);
app.use('/visaStatus', visaStatusRoutes);
app.use('', emailRegistrationRoutes);
app.use('', onboardingApplicationRoutes);
app.use('', visaStatusesRoutes);
app.use('', employeeProfileRoutes);
app.use('', previewDocumentsRoutes);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));