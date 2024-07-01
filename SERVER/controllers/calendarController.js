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

module.exports={ getCalendar,getPrescribedLessons};