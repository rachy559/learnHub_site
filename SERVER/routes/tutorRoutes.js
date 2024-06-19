const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/", async(req, res) => {
    try{
        const subjects=req.body.subjects.toString();
        const languages=req.body.languages.toString();
        const response=await controller.createTutor(req.body.intended_for_gender,subjects,languages)
        console.log("response:", response);
        res.send(await controller.getById(response.userId))
    } catch(err){
        res.status(404).send('User not found');
    }
});

module.exports = router