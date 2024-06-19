const express = require("express");
const router = express.Router();
const controller = require('../controllers/lessonsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllLenguages());
    } 
    catch (err) {
        res.status(500).send(err);
    }
})
