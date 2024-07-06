const model = require('../models/lessonsModel');

async function getAllLessons(){
    try{
        return await model.getLessons();
    }catch(err){
        throw err;
    }
}

async function createLesson(levelLesson, lessonTime, priceLesson, zoomLink, tutor_id,language_name,subjectName){
    try{
        return await model.createLesson(levelLesson, lessonTime, priceLesson, zoomLink, tutor_id,language_name,subjectName);
    }catch(err){
        throw err;
    }
}


module.exports={ getAllLessons, createLesson};