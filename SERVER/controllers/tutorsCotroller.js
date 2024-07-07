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
        const days=['ראשון','שני','שלישי','רביעי','חמישי','שישי'];
        const response1=await model2.getByEmail(email);
        return await model.createSingleTutor(intended_for_gender,subjects,languages,response1.userId,days);
    } catch (err) {
        throw err;
    }
}

async function getTutor(id) {
    try {
        const response =await model.getSingleTutor(id);
        return response[0];
    } catch (err) {
        throw err;
    }
}


module.exports={ getAllTutors,createTutor,getTutor};