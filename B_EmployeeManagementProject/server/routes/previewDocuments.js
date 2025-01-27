const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');

const connect = mongoose.createConnection(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let gridFS;

connect.once('open', () => {
  gridFS = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "filesBucket"
  });
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2000000 }});

const uploadFiles = (req, res) => {
  const readable = new Readable();
  const uploadStream = gridFS.openUploadStream(req.file.originalname, {
    metadata: { mimetype: req.file.mimetype }
  });

  readable.push(req.file.buffer);
  readable.push(null);
  readable.pipe(uploadStream);

  uploadStream.on('error', err => {
    next(err);
    return;
  });

  uploadStream.on('finish', () => {
    res.send({ success: true, data: uploadStream.id });
  });
}

const downloadFiles = (req, res) => {
  const id = req.params.id;
  try {
    const downloadStream = gridFS.openDownloadStream( new mongoose.Types.ObjectId(id))
    downloadStream.on("file", (file)=>{
      res.set("Content-Type", file.contentType)
    });
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

router.post('/uploadFile', upload.single('file'), uploadFiles);
router.get('/downloadFile/:id', downloadFiles);

module.exports = router