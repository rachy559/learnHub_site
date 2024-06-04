const pool = require('../DB');

async function getComments() {
    try {
        const sql = 'SELECT * FROM comments';
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getTutors() {
    try {
        const sql = 'SELECT u.firstName, u.lastName, f.fileUrl FROM users u JOIN tutors t ON u.userId = t.tutor_id JOIN files_for_tutors a ON t.tutor_id = a.tutor_id JOIN files f ON a.file_id = f.file_id';
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports={getComments, getTutors}