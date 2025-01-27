const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const Document = require("../models/Document");
const User = require('../models/User');
const Application = require('../models/Application');
//const PersonalInfo = require('../models/PersonalInfo');

const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Initialize GridFS
// let gfs;
// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("filesBucket"); // Bucket name
// });
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();


// Upload File
const uploadFile = async(req, res) => {
  //console.log("Uploaded File Metadata:", req.file);
  //console.log("Request Body:", req.body);
  const {type } = req.body;
  console.log("req.file:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const { originalname, mimetype, id, filename, size } = req.file;
    const document = new Document({
      fileName: originalname,
      type: type, 
      filePath: `${id}`, 
      status: "Pending",
    });

    const savedDocument = await document.save();

    const userId = req.user.id;
    
    if (!userId || !type) {
      return res.status(400).json({ message: "User ID and file type are required" });
    }
    const user = await User.findById(userId).populate('onboardingApplication'); // Populate onboardingApplication if needed
    if (!user) {
      throw new Error("User not found");
    }

    // Connect file based on its type
    if (type === "profilePicture") {
      // Connect to PersonalInfo
      if (!user.profilePicture) {
        user.profilePicture = {
        };
      }
      user.profilePicture = savedDocument._id;
    } else if (type.startsWith("opt")|| type === "i983" || type === "i20") {
      // Connect to visaStatus
      console.log("Connect to visaStatus");
      if (!user.visaStatus) {
        user.visaStatus = {
        };
      }
      const optField = type; // Ensure case matches schema (e.g., "optReceipt")
      console.log("user.visaStatus:", user.visaStatus);
      if (user.visaStatus[optField] !== undefined) {
        user.visaStatus[optField] = savedDocument._id;
      } else {
        throw new Error(`Invalid OPT-related type: ${type}`);
      }
    } else {
      // Connect to documents in ApplicationSchema
      if (!user.onboardingApplication) {
        // Create a new Application if none exists
        const application = new Application({
          status: "NeverSubmitted",
          documents: [savedDocument._id],
        });
        const savedApplication = await application.save();
        user.onboardingApplication = savedApplication._id;
      } else {
        // Append to existing application's documents array
        user.onboardingApplication.documents.push(savedDocument._id);
        await user.onboardingApplication.save();
      }
    }

    // Save updated user
    await user.save();


    res.status(201).json({
      message: "File uploaded successfully",
      file: req.file, // Contains file metadata
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
};

// Download File
const downloadFile = async (req, res) => {
  try {
    const file = await bucket.find({
       _id: mongoose.Types.ObjectId.createFromHexString(req.params.id)
      }).toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }
    const downloadStream = bucket.openDownloadStream(mongoose.Types.ObjectId.createFromHexString(req.params.id));
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Preview File
const previewFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set appropriate content type for preview
    res.set("Content-Type", file.contentType);

    // Stream file data to the response
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadFile, downloadFile, previewFile };
