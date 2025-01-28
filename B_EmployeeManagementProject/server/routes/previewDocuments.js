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

router.get('/downloadFile/:id', downloadFiles);

module.exports = router