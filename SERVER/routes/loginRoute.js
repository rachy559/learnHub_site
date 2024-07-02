const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
require('dotenv').config;
const jwt=require('jsonwebtoken');
const verify = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController');
const { generateAccessToken, generateRefreshToken } = require('../tokenUtils');
const refreshTokens = []

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

// router.post("/", authController.login,async(req, res) => {

router.post("/", async(req, res) => {
    try{
        const user=await controller.login(req.body.email,req.body.password);        
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const accessToken = generateAccessToken(user); //האם צריך אותם אם כבר שמתי בפונ שבודקת את הלוגין?
        const refreshToken = generateRefreshToken(user);//כנ"ל.
        refreshTokens.push(refreshToken);
        return res.status(200).json({
            user: user,
            token: accessToken,
            refreshToken:refreshToken,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send('Login failed');
    }
});
    
    
    //     // res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 259200000 });



// router.post("/",verify.authenticateToken, async(req, res) => {
//     try{
//         const user=await controller.login(req.body.email,req.body.password);
//         console.log(user,"user")
//         const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" })
//         // return res
//         //   .status(200)
//         //   .json({ message: "User Logged in Successfully, User authorized.", token });
//          res.status(200).send(user,"User Logged in Successfully, User authorized.");
//     } catch(err){ 
//         res.status(404).send('User not found');
//     }
// });

module.exports = router