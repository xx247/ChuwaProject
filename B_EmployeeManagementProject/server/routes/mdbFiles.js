const express = require('express');
const { uploadFile, downloadFile, previewFile } = require('../controllers/mdbFileController');
const {upload} = require('../middlewares/mdbUploadFiles'); 
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Upload file
router.post('/upload/singlefile', upload().single('file'), authenticateToken, uploadFile);

// Download file by ID
router.get('/download/:id', downloadFile);

// Preview file by ID
router.get('/preview/:id', previewFile);

module.exports = router;
