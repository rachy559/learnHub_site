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
        res.send({ lessons });
    } 
    catch (err) {
        res.status(500).send(err);
    }
})

router.get("/:type",async (req, res)=>{

})

router.post("/", async (req, res) => {
    try {
        const lesson = await controller.createLesson(req.body.levelLesson, req.body.lessonTime, req.body.priceLesson, req.body.zoomLink, req.body.tutor_id,req.body.language_name,req.body.subjectName);
        res.status(201).send({ lesson });
    } 
    catch (err) {
        res.status(500).send(err);
    }
})



module.exports = router