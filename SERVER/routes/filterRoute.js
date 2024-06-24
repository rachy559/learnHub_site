const express = require("express");
const router = express.Router();
const controller = require('../controllers/filterController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const languages = await controller.getAllLanguages();
        const subjects = await controller.getAllSubjects();
        console.log("oo",languages,subjects)
        res.setHeader('Content-Type', 'application/json');
        res.send({ languages, subjects });
    }
    catch (err) {
        res.status(500).send(err);
    }
})
router.get("/:type", async (req, res) => {
    const locations = await controller.getAllLocations();
    res.send({ locations });

})

module.exports = router