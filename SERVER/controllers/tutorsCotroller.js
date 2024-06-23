const model = require('../models/tutorsModel');
const model2 = require('../models/usersModel');

const bcrypt = require('bcrypt');

async function getAllTutors(limit){
    try{
        return model.getTutors(limit);
    }catch(err){
        throw err;
    }
}

async function createTutor(intended_for_gender,subjects,languages,email) {
    try {
        const response1=await model2.getByEmail(email);
        console.log("w22",response1);
        const response =await model.createSingleTutor(intended_for_gender,subjects,languages,response1.userId);
        console.log("response=", response)
        return response[0];
    } catch (err) {
        throw err;
    }
}

module.exports={ getAllTutors,createTutor};