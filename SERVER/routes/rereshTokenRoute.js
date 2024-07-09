const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../tokenUtils');

router.post('/', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid refresh token');
        }
        console.log('usertoaccess',user);
        const newAccessToken = generateAccessToken(user);
        res.send({ newAccessToken });
    });
});

module.exports = router;

