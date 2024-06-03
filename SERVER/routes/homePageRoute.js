const express = require("express");
const router = express.Router();
const controller = require('../controllers/homePageController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());


router.get("/", async (req, res) => {
    try {
       res.send(await controller.getAllComments());
       res.send(await controller.getAllTutors());
    } catch (err) {
        res.status(500).send(err);
    }
})

// router.get("/", async (req, res) => {
//     try {
//         res.send(await controller.getAllTutors());
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })
module.exports = router


