const express = require("express");
const router = express.Router();
const controller = require('../controllers/homePageController')
const controller1 = require('../controllers/tutorsCotroller')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/comments", async (req, res) => {
    try {
       res.send(await controller.getAllComments());
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/tutors", async (req, res) => {
    try {
        res.send(await controller1.getAllTutors());
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;


