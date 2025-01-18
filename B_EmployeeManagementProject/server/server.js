require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Databse connection
connectDB();

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));