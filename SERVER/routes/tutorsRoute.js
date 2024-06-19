const express = require("express");
const router = express.Router();
const controller = require('../controllers/tutorsCotroller')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const { _limit } = req.query;
        res.send(await controller.getAllTutors(_limit));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post("/", async(req, res) => {
    try{
        const subjects=req.body.subjects.toString();
        const languages=req.body.languages.toString();
        console.log("s",subjects,languages)
        const response=await controller.createTutor(req.body.intended_for_gender,subjects,languages,req.body.email)
        console.log("response:", response);
        res.send(response)
    } catch(err){
        res.status(404).send('User not found');
    }
});


module.exports = router;
