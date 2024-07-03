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

router.post("/", async(req, res) => {
    try{
        const response = await controller.createLesson(req.body.lesson_id, req.body.student_id, req.body.dayLesson,req.body.timeLesson,req.body.dateLesson);
        res.status(201).send({response});    
    } catch(err){
        res.status(404).send(' not found');
    }
});

module.exports = router