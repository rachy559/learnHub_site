const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

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

async function create(firstName,lastName,email,phone,gender,birth_date,rollId,password,city,street,house_number,createDate) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response =await model.createUser(firstName,lastName,email,phone,gender,birth_date,rollId,hashedPassword,city,street,house_number,createDate);
        return response[0];
    } catch (err) {
        throw err;
    }
}


async function getByEmail(email) {
    try {
        const response = await model.getByEmail(email);
        return response;
    } catch (err) {
        throw err;
    }
}



module.exports = { getById, getUsers, create,getByEmail };
