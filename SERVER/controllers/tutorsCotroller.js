const model = require('../models/tutorsModel');
const bcrypt = require('bcrypt');

async function getAllTutors(limit){
    try{
        return model.getTutors(limit);
    }catch(err){
        throw err;
    }
}
module.exports={ getAllTutors};