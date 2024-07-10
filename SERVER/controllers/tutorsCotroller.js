const model = require('../models/tutorsModel');
const model2 = require('../models/usersModel');

const bcrypt = require('bcrypt');

async function getAllTutors(){
    try{
        return model.getTutors();
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function createTutor(intended_for_gender,subjects,languages,email) {
    try {
        const days=['ראשון','שני','שלישי','רביעי','חמישי','שישי'];
        const response1=await model2.getByEmail(email);
        return await model.createSingleTutor(intended_for_gender,subjects,languages,response1.userId,days);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getTutor(id) {
    try {
        const response =await model.getSingleTutor(id);
        return response[0];
    } catch (err) {
        console.log(err);
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

async function updateRoleUser(id,rollId) {
    try {
        const response = await model.updateRoleUser(id,rollId);
        return response;
    } catch (err) {
        throw err;
    }
}

async function deleteTutor(id) {
    try {
        const response = await model.deleteTutor(id);
        return response;
    } catch (err) {
        throw err;
    }
}

module.exports={ getAllTutors,createTutor,getTutor,getAllNotConfirmTutors,updateRoleUser,deleteTutor};