const model = require('../models/lessonsModel');

async function getAllLessons(){
    try{
        return await model.getLessons();
    }catch(err){
        throw err;
    }
}

async function createLesson(lesson_id,student_id,dayLesson,timeLesson,dateLesson){
    try{
        return await model.createLesson(lesson_id,student_id,dayLesson,timeLesson,dateLesson);
    }catch(err){
        throw err;
    }
}

module.exports={ getAllLessons,createLesson};