const model = require('../models/studentLessonModel');

async function createLesson(lesson_id,student_id,dayLesson,timeLesson,dateLesson){
    try{
        return await model.createLesson(lesson_id,student_id,dayLesson,timeLesson,dateLesson);
    }catch(err){
        throw err;
    }
}

async function deleteLesson(id,student_id,dateLesson,timeLesson){
    try{
        return await model.deleteLesson(id,student_id,dateLesson,timeLesson);
    }catch(err){
        throw err;
    }
}

async function updateLesson(id,student_id,dateLesson,timeLesson,updatedDateLesson,updatedTimeLesson){
    try{
        return await model.updateLesson(id,student_id,dateLesson,timeLesson,updatedDateLesson,updatedTimeLesson);
    }catch(err){
        throw err;
    }
}

module.exports={ createLesson, deleteLesson, updateLesson};