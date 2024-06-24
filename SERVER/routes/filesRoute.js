const express = require("express");
const router = express.Router();
const multer =require("multer")
const path= require("path");
const controller = require('../controllers/homePageController')
const controllerTutors = require('../controllers/tutorsCotroller')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({
    storage: storage
})

router.post('/',upload.single('file'), (req, res) => {
    console.log(req.file); // הוסף שורה זו כדי להדפיס את תוכן req.file
    const files = req.file.filename;
    const sql = "INSERT INTO files (`fileUrl`) VALUES(?)"
    const result =  pool.query(sql, [files]);

})
module.exports = router;