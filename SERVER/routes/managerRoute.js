const express = require("express");
const router = express.Router();
const controller = require('../controllers/tutorsCotroller')
const controller2 = require('../controllers/lessonsController')
const controllerManager = require('../controllers/managerController')
const cors = require('cors'); 
router.use(cors());
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;

router.get('/',async(req,res)=>{
    try{
    const tutors=await controller.getAllNotConfirmTutors();
    res.status(200).send(tutors);
    }catch(err){
        console.error(err);
        res.status(500).send(err)
    }
})

router.get('/:type',async(req,res)=>{
    try{
        const type = req.params;
        if(type.type=='1'){
            const manager=await controllerManager.getManagerDetails(type);
            res.status(200).send(manager);
        }
        else{
            const response=await controller2.getAllStudentsLessons();
            res.status(200).send(response);
        }
    }catch(err){
        console.error(err);
        res.status(500).send(err)
    }
})

router.put('/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    const tutors=await controller2.updatePayedLesson(id,req.body.isPayed,req.body.lesson_id,req.body.timeLesson,req.body.dateLesson);
    res.status(200).send(tutors);
    }catch(err){
        console.error(err);
        res.status(500).send(err)
    }
})

module.exports = router;