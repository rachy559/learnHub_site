const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

// async function getUser(){
//     try{
//         return model.getUserData();
//     }catch(err){
//         throw err;
//     }
// }

async function login(email, password) {
    try {
        const user = await model.getByUsername(email);
        console.log("u",user)
        if (!user) {
            throw new Error('User not exist');
        } else {
            const passwordUser = await model.getPassword(user.userId)
            const response = bcrypt.compare(password, passwordUser.password)
            if (response) {
                 console.log("u", user)
                return user;
            } else {
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

module.exports={ getById,login};