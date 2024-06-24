const pool = require('../DB');

async function getLanguages() {
    try {
        const sql = `SELECT language_name FROM languages`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getSubjects() {
    try {
        const sql = `SELECT subjectName FROM subjects`;
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = { getLanguages, getSubjects };
