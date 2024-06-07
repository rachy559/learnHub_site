const model = require('../models/tutorsModel');
const bcrypt = require('bcrypt');

async function getAllTutors(){
    try{
        return model.getTutors();
    }catch(err){
        throw err;
    }
}
module.exports={ getAllTutors};