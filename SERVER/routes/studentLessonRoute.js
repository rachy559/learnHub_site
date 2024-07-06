const express = require("express");
const router = express.Router();
const controller = require('../controllers/studentLessonController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.post("/", async(req, res) => {
    try{
        const response = await controller.createLesson(req.body.lesson_id, req.body.student_id, req.body.dayLesson,req.body.timeLesson,req.body.dateLesson);
        res.status(201).send({response});    
    } catch(err){
        res.status(404).send(' not found');
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const response = await controller.deleteLesson(id,req.body.student_id,req.body.dateLesson,req.body.timeLesson);
        res.status(201).send();    
    } catch(err){
        res.status(404).send(' not found');
    }
});

router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const response = await controller.updateLesson(id,req.body.student_id,req.body.dateLesson,req.body.timeLesson,req.body.updatedDateLesson,req.body.updatedTimeLesson);
        res.status(201).send();    
    } catch(err){
        res.status(404).send(' not found');
    }
});

module.exports = router