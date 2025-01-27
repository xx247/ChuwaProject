require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const documentRoutes = require('./routes/mdbFiles');
const userInfoRoutes = require('./routes/userInfo');
const visaStatusRoutes = require('./routes/visaStatus');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(cors());

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

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));