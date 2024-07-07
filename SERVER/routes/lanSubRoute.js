const express = require("express");
const router = express.Router();
const controller = require('../controllers/lessonsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());


router.post("/:type", async (req, res) => {
    try {
        const type = req.params.type;
        if (type === 'lan') {
            const language = await controller.createLanguage(req.body.tutor_id,req.body.languages);
            res.status(201).send({ language });
        } else if (type === 'sub') {
            const subject = await controller.createSubject(req.body.tutor_id,req.body.subjects);
            res.status(201).send();
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})



module.exports = router