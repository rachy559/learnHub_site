const model = require('../models/usersModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

async function getUsers(query){
    try{
        return await model.getUsers(query);
    }catch(err){
        throw err;
    }
}

async function getById(id) {
    try {
        return await model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function create(firstName,lastName,email,phone,gender,birth_date,rollId,password,city,street,house_number) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = model.createUser(firstName,lastName,email,phone,gender,birth_date,rollId,hashedPassword,city,street,house_number);
        return response[0];
    } catch (err) {
        throw err;
    }
}

async function getAllNotConfirmTutors() {
    try {
        const response =await model.getAllNotConfirmTutors();
        return response;
    } catch (err) {
        throw err;
    }
}



module.exports = { getById, getUsers, create, getAllNotConfirmTutors };
