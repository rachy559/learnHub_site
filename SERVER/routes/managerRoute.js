const express = require("express");
const router = express.Router();
const controller = require('../controllers/tutorsCotroller')
const cors = require('cors'); 
router.use(cors());
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;

router.get('/',async(req,res)=>{
    try{
    const tutors=await controller.getAllNotConfirmTutors();
    res.send(tutors);
    }catch(err){
        res.status(500).send(err)
    }
})

// router.get('/:id',async(req,res)=>{
//     try{
//     const id = req.params.id;
//     const tutors=await controller.getManagerDetails();
//     res.send(tutors);
//     }catch(err){
//         res.status(500).send(err)
//     }
// })


module.exports = router;