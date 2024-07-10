const modelUser = require('../models/usersModel')
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../tokenUtils');


async function login(email, password) {
    try {
        const user = await modelUser.getByEmail(email);
        if (!user) {
            return { status: 401, json: { message: 'Authentication failed' } }
        };
        const passwordUser = await modelUser.getPassword(user.userId)
        const validPassword = await bcrypt.compare(password, passwordUser.password);
        if (!validPassword) {
            return { status: 401, json: { message: 'Invalid password' } };
        }
        const accessToken = generateAccessToken(user);
        return { status: 200, json: { accessToken, user } };
    }
    catch (err) {
        return { status: 500, json: { message: 'Internal server error' } };
    }
};
module.exports = { login };

