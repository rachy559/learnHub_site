const pool = require('../DB');

async function createSingleStudent(studentStatus,userId) {
    try {
        console.log("t",userId,studentStatus)
        const sql="INSERT INTO students (`student_id`,`studentStatus`) VALUES(?,?)";
        await pool.query(sql, [userId, studentStatus]);
        return userId;
    } catch (err) {
        throw err;
    }
}

module.exports = { createSingleStudent }