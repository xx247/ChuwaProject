const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// MongoDB connection URI
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/your-database-name";

// Create a GridFS storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return {
//       filename: `${Date.now()}-${file.originalname}`, // Generate a unique filename
//       bucketName: 'uploads', // Bucket name in MongoDB
//     };
//   },
// });

function upload() {
  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };
