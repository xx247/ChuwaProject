const uploadDocument = async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
  
    const uploadedFiles = req.files.map((file) => ({
      type: file.mimetype,
      url: file.location, // The file URL on S3
    }));
  
    try {
      // Save the uploaded file information to the database if necessary
      res.status(200).json({
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  module.exports = { uploadDocument };