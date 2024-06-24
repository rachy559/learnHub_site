const model = require('../models/lessonsModel');

async function getAllLessons(){
    try{
        return await model.getLessons();
    }catch(err){
        throw err;
    }
}

module.exports={ getAllLessons};