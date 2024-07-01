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
        res.status(201).send(await controller.getCalendar(id));
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router