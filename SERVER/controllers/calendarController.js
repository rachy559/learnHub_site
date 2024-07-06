const model = require('../models/calendarModel');


async function getCalendar(tutor_id){
    try{
        return await model.getTimes(tutor_id);
    }catch(err){
        throw err;
    }
}

async function getPrescribedLessons(tutor_id){
    try{
        return await model.getrescribedTimes(tutor_id);
    }catch(err){
        throw err;
    }
}

async function createTime(lessonDate,lessonHour,tutor_id){
    try{
        return await model.createTimeCalendar(lessonDate,lessonHour,tutor_id);
    }catch(err){
        throw err;
    }
}

async function updateTimes(tutorId,updatedTimes){
    try{
        return await model.updateAvailableTimes(tutorId,updatedTimes);
    }catch(err){
        throw err;
    }
}

async function deleteTime(id,dateLesson,timeLesson){
    try{
        return await model.deleteTime(id,dateLesson,timeLesson);
    }catch(err){
        throw err;
    }
}

async function updateTime(id,dateLesson,timeLesson,updatedDateLesson,updatedTimeLesson){
    try{
        return await model.updateTime(id,dateLesson,timeLesson,updatedDateLesson,updatedTimeLesson);
    }catch(err){
        throw err;
    }
}

module.exports={ getCalendar,getPrescribedLessons,createTime, updateTimes, deleteTime, updateTime};