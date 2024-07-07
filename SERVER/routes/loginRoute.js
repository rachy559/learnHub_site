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
        console.log(req.body);
        const jsonRes = await authController.login(req.body.email, req.body.password);
        if (jsonRes.status !== 200) {
            return res.status(jsonRes.status).send('Error occured');
        }
        const { accessToken, refreshToken, user } = jsonRes.json;
        console.log("accses",accessToken,"refresh",refreshToken);
        res.status(jsonRes.status).send(jsonRes.json);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send({ message: 'Login failed' });
    }
});

module.exports = router







// const cookieParser = require('cookie-parser');
// router.use(cookieParser());

// const refreshTokens = []

// router.post("/token", (req, res) => {
//     const refreshToken = req.body.token;
//     if (refreshToken == null) {
//       return res.status(401).send("No refresh token provided!");
//     }
//     if (!refreshTokens.includes(refreshToken)) {
//       return res.status(403).send("Invalid Refresh Token");
//     }

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) return res.status(403).send("Could not Verify Refresh Token");

//       const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET, { expiresIn: "1800s" })
//       res.json({ accessToken: token });
//     });
//   });


        // res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15000 }); // 15 seconds
        // res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
