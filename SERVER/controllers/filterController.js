const model = require('../models/filterModel');

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


async function getAllLocations(){
    try{
        return await model.getLocations();
    }catch(err){
        throw err;
    }
}

module.exports={ getAllLanguages,getAllSubjects,getAllLocations};