const model = require('../models/usersModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

async function getUsers(query){
    try{
        return model.getUsers(query);
    }catch(err){
        throw err;
    }
}

// async function loginController(username,password){
//     try {
//         const userToLogIn= await model.loginModel(username,password);
//         if (!userToLogIn ) {
//             throw new Error('Unauthorized');
//         }
//         const passwordMatch = await bcrypt.compare(password, userToLogIn.password);
//         if (passwordMatch) {
//             throw new Error('Unauthorized');
//         }
//         return (userToLogIn)
//     } 
//     catch (err) {
//         throw err;
//     }
// }

async function login(email, password) {
    try {
        const user = await model.getByEmail(email);
        console.log("u", user)
        if (!user) {
            throw new Error('User not exist');
        } 
            const passwordUser = await model.getPassword(user.userId)
            // if (password == passwordUser.password) {
            //     console.log("u1", user)
            //     return user;
            // }
            const response = bcrypt.compare(password, passwordUser.password)
            if (response) {
                 console.log("u", user)
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
        console.log("id",id)
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function create(firstName,lastName,email,phone,gender,birth_date,rollId,password,city,street,house_number) {
    try {
        //const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = model.createUser(firstName,lastName,email,phone,gender,birth_date,rollId,hashedPassword,city,street,house_number);
        console.log("response=", response[0])
        return response[0];
    } catch (err) {
        throw err;
    }
}

async function createTutor(intended_for_gender,subjects,languages,e,email) {
    try {
        const userId=model.getByEmail(email).userId;
        const response= model.createTutor(intended_for_gender,subjects,languages,userId);
       console.log("response=", response)
        return response[0];
    } catch (err) {
        throw err;
    }
}

module.exports = { getById, login, getUsers, create,createTutor };