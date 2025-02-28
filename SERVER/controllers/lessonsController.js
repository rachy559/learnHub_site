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

async function createSubject(tutor_id,subjects){
    try{
        return await model.createSubject(tutor_id,subjects);
    }catch(err){
        throw err;
    }
}

async function createLanguage(tutor_id,languages){
    try{
        return await model.createLanguage(tutor_id,languages);
    }catch(err){
        throw err;
    }
}

async function getAllStudentsLessons(){
    try{
        return await model.getAllStudentsLessons();
    }catch(err){
        throw err;
    }
}

async function updatePayedLesson(id,isPayed,lessonId,timeLesson,dateLesson){
    try{
        return await model.updatePayedLesson(id,isPayed,lessonId,timeLesson,dateLesson);
    }catch(err){
        throw err;
    }
}

module.exports={ getAllLessons, createLesson, createSubject, createLanguage,getAllStudentsLessons,updatePayedLesson};