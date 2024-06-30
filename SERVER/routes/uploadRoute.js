const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config();

const { CLIENT_EMAIL, PRIVATE_KEY, FOLDER_ID } = process.env;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});


const drive = google.drive({ version: 'v3', auth });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

async function uploadFileToDrive(fileName, filePath) {
  console.log('file upload');

  const fileMetadata = {
    name: fileName,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: 'application/pdf', 
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log(`File uploaded successfully. File ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

router.post('/', upload.single('file'), async (req, res) => {
  console.log('POST /upload route hit');
  const file = req.file;
  console.log(`File received: ${JSON.stringify(file)}`);

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    console.log(file.originalname);
    console.log(file.path);

    const fileId = await uploadFileToDrive(file.originalname, file.path);
    const fileUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    console.log(`File URL: ${fileUrl}`);

    res.status(200).send({ ok: true, message: `File uploaded successfully. File ID: ${fileId}`, url: fileUrl });
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});

module.exports = router;
