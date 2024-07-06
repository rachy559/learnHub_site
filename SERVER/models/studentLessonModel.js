const pool = require('../DB');

async function createLesson(lesson_id, student_id, dayLesson, timeLesson, dateLesson) {
    try {
        const sql = "INSERT INTO lesson_for_student (lesson_id,student_id,dayLesson,timeLesson,dateLesson) VALUES (?,?, ?, ? ,?)";
        const result = await pool.query(sql, [lesson_id, student_id, dayLesson, timeLesson, dateLesson]);
        return result[0].insertId;
    } catch (err) {
        throw err;
    }
}

async function deleteLesson(id, student_id, dateLesson, timeLesson) {
    try {
        const sql = "DELETE FROM lesson_for_student WHERE lesson_id=? AND student_id=? AND timeLesson=? AND dateLesson =?";
        await pool.query(sql, [id, student_id, timeLesson, dateLesson]);
    } catch (err) {
        throw err;
    }
}

async function updateLesson(id, student_id, dateLesson, timeLesson,updatedDateLesson,updatedTimeLesson) {
    try {
        const sql = "UPDATE lesson_for_student SET timeLesson=? , dateLesson =? WHERE lesson_id=? AND student_id=? AND timeLesson=? AND dateLesson =?";
        await pool.query(sql, [updatedTimeLesson,updatedDateLesson,id, student_id, timeLesson, dateLesson]);
    } catch (err) {
        throw err;
    }
}

module.exports = { createLesson, deleteLesson, updateLesson };
