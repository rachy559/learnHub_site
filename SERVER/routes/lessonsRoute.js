const express = require("express");
const router = express.Router();
const controller = require('../controllers/lessonsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const languages = await controller.getAllLanguages();
        const subjects = await controller.getAllSubjects();
        res.setHeader('Content-Type', 'application/json');
        res.send({ languages, subjects });
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router