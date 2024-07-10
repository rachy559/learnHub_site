const express = require("express");
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;
const jwt = require('jsonwebtoken');
const verify = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController');

router.post("/", async (req, res) => {
    try {
        const jsonRes = await authController.login(req.body.email, req.body.password);
        if (jsonRes.status !== 200) {
            return res.status(jsonRes.status).send('Error occured');
        }
        const { accessToken, user } = jsonRes.json;
        res.status(jsonRes.status).send(jsonRes.json);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send({ message: 'Login failed' });
    }
});

module.exports = router







