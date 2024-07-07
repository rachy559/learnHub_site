const model = require('../models/studentsModel');
const model2 = require('../models/usersModel');


async function createStudent(studentStatus,email) {
    try {
        const response1=await model2.getByEmail(email);
        const response =await model.createSingleStudent(studentStatus,response1.userId);
        return response1;
    } catch (err) {
        throw err;
    }
}

async function getStudent(id) {
    try {
        const response =await model.getSingleStudent(id);
        return response[0];
    } catch (err) {
        throw err;
    }
}

module.exports={ createStudent,getStudent };