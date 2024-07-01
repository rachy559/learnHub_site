const model = require('../models/calendarModel');


async function getCalendar(tutor_id){
    try{
        return await model.getTimes(tutor_id);
    }catch(err){
        throw err;
    }
}


module.exports={ getCalendar};