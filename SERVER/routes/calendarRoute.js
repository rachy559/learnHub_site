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
        res.status(500).json(err);
    }
})

router.post("/", async(req, res) => {
    try{
        const response = await controller.createTime(req.body.lessonDate, req.body.lessonHour, req.body.tutor_id);
        res.status(201).send({response});    
    } catch(err){
        res.status(404).send(' not found');
    }
});

router.put("/", async(req, res) => {
    try{
        console.log(req.body.tutorId, req.body.updatedTimes)
        const response = await controller.updateTimes(req.body.tutorId, req.body.updatedTimes)
        console.log("re",response)
        res.status(201).send(response);    
    } catch(err){
        res.status(404).send(' not found');
    }
});


module.exports = router