const modelAuth = require('../models/authModel');
const modelUser=require('../models/usersModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../tokenUtils');

const refreshTokens = []

async function login(email, password) {
    try {
        console.log(email);
    const user = await modelUser.getByEmail(email);
        console.log("user",user);
        if (!user) {
        return{status: 401, json: { message: 'Authentication failed' }}};
    const passwordUser = await modelUser.getPassword(user.userId)
    console.log("pass",password);
    console.log("passuser",passwordUser)
    const validPassword = await bcrypt.compare(password, passwordUser.password);
    console.log("v",validPassword);
    if (!validPassword) {
        return {status: 401, json: { message: 'Invalid password' }};
    }
    const accessToken = generateAccessToken(user); 
    console.log("accessToken",accessToken);
    const refreshToken = generateRefreshToken(user);
    console.log("refreshToken",refreshToken);
    refreshTokens.push(refreshToken);
    return { status: 200, json: { accessToken, refreshToken, user } };
}
    catch(err){
        return { status: 500, json: { message: 'Internal server error' } };
    }
};
module.exports = { login };

