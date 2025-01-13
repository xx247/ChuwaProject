require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/products');
const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// Routes
app.use('', productRoutes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));