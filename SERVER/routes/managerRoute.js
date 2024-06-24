const express = require("express");
const router = express.Router();
const controller = require('../controllers/managerController')
const cors = require('cors'); 
router.use(cors());
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;

router.get('/',async(req,res)=>{
    try{
    const tutors=await controller.getAllTutors();
    res.send(tutors);
    }catch(err){
        res.status(500).send(err)
    }



})