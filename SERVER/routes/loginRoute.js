const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;
const verify = require('../authMiddleware')

// router.post("/", async(req, res) => {
//     try{
        
//         // const user={email:req.body.email, password:req.body.password}
//         // const accesToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET) 
//         const user=await controller.login(req.body.email,req.body.password);
//         // const accesToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET) 
        
//         console.log("resuser",user);
//         // const user2=await controller.getById(response.userId);
//         // console.log("user2",user2);
//         // res.json({accesToken: accesToken});
//         res.send(user);
//     } catch(err){ 
//         res.status(404).send('User not found');
//     }});


router.post("/",verify.authenticateToken, async(req, res) => {
    try{
        const user=await controller.login(req.body.email,req.body.password);
        console.log(user,"user")
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" })
        // return res
        //   .status(200)
        //   .json({ message: "User Logged in Successfully, User authorized.", token });
         res.status(200).send(user,"User Logged in Successfully, User authorized.");
    } catch(err){ 
        res.status(404).send('User not found');
    }
});

module.exports = router