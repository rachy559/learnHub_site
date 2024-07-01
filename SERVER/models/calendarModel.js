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

module.exports = { getTimes,getrescribedTimes };
