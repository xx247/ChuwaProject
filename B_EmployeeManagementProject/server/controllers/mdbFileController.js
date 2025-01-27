const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Initialize GridFS
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Bucket name
});

// Upload File
const uploadFile = (req, res) => {
    console.log('Uploaded File Metadata:', req.file);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log(req.file);
  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file, // Contains file metadata
  });
};

// Download File
const downloadFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Stream file data to the response
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Preview File
const previewFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set appropriate content type for preview
    res.set('Content-Type', file.contentType);

    // Stream file data to the response
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadFile, downloadFile, previewFile };
