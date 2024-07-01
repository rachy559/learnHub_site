const express = require("express");
const router = express.Router();
const controller = require('../controllers/calendarController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = {
            availableTimes: await controller.getCalendar(id),
            prescribedTimes: await controller.getPrescribedLessons(id)
        }
        console.log("res",response)
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router