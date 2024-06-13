const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function getUsers(query){
    try{
        return model.getUsers(query);
    }catch(err){
        throw err;
    }
}

async function login(email, password) {
    try {
        const user = await model.getByUsername(email);
        console.log("u", user)
        if (!user) {
            throw new Error('User not exist');
        } else {
            const passwordUser = await model.getPassword(user.userId)
            if (password == passwordUser.password) {
                console.log("u1", user)
                return user;
            }
            // const response = bcrypt.compare(password, passwordUser.password)
            // if (response) {
            //      console.log("u", user)
            //     return user;
        else {
            throw new Error('Passwords are not matching');
        }
    }
    } catch (err) {
    throw err;
}

}

async function getById(id) {
    try {
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function create(firstName,lastName,email,phone,gender,birth_date,password,city,street,house_number) {
    try {
        return model.createUser(firstName,lastName,email,phone,gender,birth_date,password,city,street,house_number);
    } catch (err) {
        throw err;
    }
}

module.exports = { getById, login, getUsers, create };