const model = require('../models/lessonsModel');

async function getAllLanguages(){
    try{
        return await model.getLanguages();
    }catch(err){
        throw err;
    }
}

async function getAllSubjects(){
    try{
        return await model.getSubjects();
    }catch(err){
        throw err;
    }
}
module.exports={ getAllLanguages,getAllSubjects};