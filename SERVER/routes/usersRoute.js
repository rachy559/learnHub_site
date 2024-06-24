const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());
const jwt = require("jsonwebtoken");
require ('../authMiddleware')


router.get("/", async (req, res) => {
    try {
        console.log(req.query)
        res.status(201).send(await controller.getUsers(req.query));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post("/", async (req, res) => {
    try {
        res.status(201).send(await controller.create(req.body.firstName,req.body.lastName,req.body.email,req.body.phone,req.body.gender,req.body.birth_date,req.body.rollId,req.body.password,req.body.city,req.body.street,req.body.house_number));
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;
