const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../tokenUtils');

router.post('/', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid refresh token');
        }
        // צור access token חדש
        const newAccessToken = generateAccessToken({ id: user.id, email: user.email });
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, maxAge: 15 * 1000 }); // 15 שניות
        res.send({ newAccessToken });
    });
});

module.exports = router;
