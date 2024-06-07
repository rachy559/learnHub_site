const model = require('../models/homePageModel');
const bcrypt = require('bcrypt');

async function getAllComments(){
    try{
        return model.getComments();
    }catch(err){
        throw err;
    }
}

// async function getAllTutors(){
//     try{
//         return model.getTutors();
//     }catch(err){
//         throw err;
//     }
// }

module.exports={getAllComments, getAllTutors};