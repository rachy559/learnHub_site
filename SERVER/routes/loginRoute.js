const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/", async(req, res) => {
    try{
        console.log("r",req)
        const response=await controller.login(req.body.email,req.body.password)
        console.log("username: ", req.body.email)
        console.log("password: ", req.body.password)
        console.log("response:", response);
        res.send(await controller.getById(response.userId))
    } catch(err){
        res.status(404).send('User not found');
    }
   
});

module.exports = router