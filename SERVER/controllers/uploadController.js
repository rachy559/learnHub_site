const model = require('../models/uploadModel');
const multer = require('multer');
const path = require('path');

// Set up storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  try {
    upload.single('file')(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { filename } = req.file;
      const fileUrl = `uploads/${filename}`;
      const tutorId = req.body.tutorId; // Assuming tutorId is sent in the request body

      try {
        console.log("ww",fileUrl,tutorId)
        const fileId = model.createFile(fileUrl, tutorId);

        res.status(200).json({ message: 'File uploaded and associated with tutor successfully', file: req.file });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile
};
