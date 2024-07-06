const pool = require('../DB');

async function getTimes(tutor_id) {
    try {
        const sql = "SELECT dayLesson, timesAvaliablePerDay FROM calander_work WHERE tutorId = ?";
        const [rows, fields] = await pool.query(sql, [tutor_id]);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getrescribedTimes(tutor_id) {
    try {
        const sql = "SELECT lessonDate, lessonHour FROM prescribedlessons WHERE tutor_id = ?";
        const [rows, fields] = await pool.query(sql, [tutor_id]);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function createTimeCalendar(lessonDate, lessonHour, tutor_id) {
    try {
        const sql = "INSERT INTO prescribedLessons (tutor_id, lessonDate, lessonHour) VALUES (?, ?, ?)";
        const result = await pool.query(sql, [tutor_id, lessonDate, lessonHour]);
        return result[0].insertId;
    } catch (err) {
        throw err;
    }
}




async function updateAvailableTimes(tutorId, updatedTimes) {
    try {
        updatedTimes.forEach(day => {
            const { available_day, available_times } = day;
            const sql = `UPDATE calander_work 
                         SET timesAvaliablePerDay = ?
                         WHERE tutorId = ? AND dayLesson = ?`;

            const response = pool.query(sql, [available_times, tutorId, available_day]);            
            console.log(`Updated for ${available_day}`);
        });
        return updatedTimes;
    } catch (err) {
        throw err;
    }
}

async function deleteTime(id,dateLesson,timeLesson) {
    try {
        const sql = "DELETE FROM prescribedlessons WHERE tutor_id=? AND lessonDate=? AND lessonHour =?";
        await pool.query(sql, [id,dateLesson, timeLesson]);
    } catch (err) {
        throw err;
    }
}

async function updateTime(id,dateLesson,timeLesson,updatedDateLesson,updatedTimeLesson) {
    try {
        const sql = "UPDATE prescribedlessons SET lessonDate=? , lessonHour =? WHERE tutor_id=? AND lessonDate=? AND lessonHour =?";
        await pool.query(sql, [updatedDateLesson,updatedTimeLesson,id,dateLesson, timeLesson]);
    } catch (err) {
        throw err;
    }
}

module.exports = { getTimes, getrescribedTimes, createTimeCalendar, updateAvailableTimes, deleteTime,updateTime };
