require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const documentRoutes = require('./routes/mdbFiles');
const userInfoRoutes = require('./routes/userInfo');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

//Databse connection
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/application', applicationRoutes);
app.use('/document', documentRoutes);
app.use('/userInfo', userInfoRoutes);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));