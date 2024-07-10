const express = require("express");
const router = express.Router();
const controller = require('../controllers/uploadController');
const { verifyJWT, authAdmin } = require('../middlewares/authMiddleware');
const cors = require('cors'); 
const multer = require('multer'); 
const path = require('path');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
    storage: storage
});


router.post('/', upload.single('file'), async (req, res) => {
  try{
    const file = req.file;
    const tutorId = req.body.tutor_id; 
    const response = await controller.createFile(file.filename,tutorId);
    res.status(201).send({response});
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
 
});



module.exports = router;