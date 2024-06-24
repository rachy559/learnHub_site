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

async function login(email, password) {
    try {
        const user = await model.getByEmail(email);
        if (!user) {
            throw new Error('User not exist');
        } 
            const passwordUser = await model.getPassword(user.userId)
            const response = bcrypt.compare(password, passwordUser.password)
            if (response) {
                return user;
            }
        else {
            throw new Error('Passwords are not matching');
        }
    
    } catch (err) {
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



module.exports = { getById, login, getUsers, create };