const express = require("express");
const router = express.Router();
const controller = require('../controllers/studentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.post("/", async(req, res) => {
    try{
        const response = await controller.createStudent(req.body.status,req.body.email)
        console.log("response:", response);
        res.send(response)
    } catch(err){
        res.status(404).send('User not found');
    }
});

router.get("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        console.log("is",id);
        const response = await controller.getStudent(id)
        console.log("response:", response);
        res.send(response)
    } catch(err){
        res.status(404).send('User not found');
    }
});

module.exports = router;
