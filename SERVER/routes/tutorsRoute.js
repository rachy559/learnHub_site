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
        console.log(err);
        res.status(500).send(err);
    }
})

router.post("/", async(req, res) => {
    try{
        const subjects=req.body.subjects.toString();
        const languages=req.body.languages.toString();
        console.log("rty", req.body.intended_for_gender,subjects,languages,req.body.email)
        const response = await controller.createTutor(req.body.intended_for_gender,subjects,languages,req.body.email)
        res.status(201).send({response})
    } catch(err){
        console.log(err);
        res.status(404).send('User not found');
    }
});

router.get("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const response = await controller.getTutor(id)
        res.send(response)
    } catch(err){
        console.log(err);
        res.status(404).send('User not found');
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log("kol")
        res.status(201).send(await controller.updateRoleUser(id,req.body.rollId));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.deleteTutor(id);
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;
