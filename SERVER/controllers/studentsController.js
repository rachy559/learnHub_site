const model = require('../models/studentsModel');
const model2 = require('../models/usersModel');


async function createStudent(studentStatus,email) {
    try {
        const response1=await model2.getByEmail(email);
        console.log("w",response1)
        const response =await model.createSingleStudent(studentStatus,response1.userId);
        return response[0];
    } catch (err) {
        throw err;
    }
}

async function getStudent(id) {
    try {
        console.log(id)
        const response =await model.getSingleStudent(id);
        return response[0];
    } catch (err) {
        throw err;
    }
}

module.exports={ createStudent,getStudent };