const express = require("express");
const router = express.Router();
const controller = require('../controllers/lessonsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const languages = await controller.getAllLenguages();
        res.setHeader('Content-Type', 'application/json');  // הוסף כותרת JSON
        res.send(languages);
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router