const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';

// Create a GridFS storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, // Generate a unique filename
      bucketName: 'uploads', // Bucket name in MongoDB
    };
  },
});

// Initialize multer with GridFS storage
const upload = multer({ storage });

module.exports = upload;
