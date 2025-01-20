const express = require('express');
const upload = require('../middlewares/uploadFiles'); // Import multer-S3 config
const { uploadDocument } = require('../controllers/documentController');

const router = express.Router();

router.post('/upload', upload.array('files', 5), uploadDocument); // Upload up to 5 files

module.exports = router;
