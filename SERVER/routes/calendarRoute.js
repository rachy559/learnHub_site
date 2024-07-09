const express = require("express");
const router = express.Router();
const controller = require('../controllers/calendarController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = {
            availableTimes: await controller.getCalendar(id),
            prescribedTimes: await controller.getPrescribedLessons(id)
        }
        res.status(201).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/", async(req, res) => {
    try{
        const response = await controller.createTime(req.body.lessonDate, req.body.lessonHour, req.body.tutor_id);
        res.status(201).send({response});    
    } catch(err){
        console.log(err);
        res.status(404).send(' not found');
    }
});

router.put("/", async(req, res) => {
    try{
        const response = await controller.updateTimes(req.body.tutorId, req.body.updatedTimes)
        res.status(201).send(response);    
    } catch(err){
        console.log(err);
        res.status(404).send(' not found');
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const response = await controller.deleteTime(id,req.body.dateLesson,req.body.timeLesson)
        res.status(201).send();    
    } catch(err){
        console.log(err);
        res.status(404).send(' not found');
    }
});

router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const response = await controller.updateTime(id,req.body.dateLesson,req.body.timeLesson,req.body.updatedDateLesson,req.body.updatedTimeLesson)
        res.status(201).send();    
    } catch(err){
        console.log(err);
        res.status(404).send(' not found');
    }
});


module.exports = router