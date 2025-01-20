require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');

const app = express();

app.use(express.json());

//Databse connection
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/application', applicationRoutes);


//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));