const express = require("express");
const router = express.Router();
const controller = require('../controllers/lessonsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const lessons = await controller.getAllLessons();
        res.setHeader('Content-Type', 'application/json');
        res.send({ lessons });
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

router.get("/:type",async (req, res)=>{

})

module.exports = router