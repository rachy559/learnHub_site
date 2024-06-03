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
        const sql = 'SELECT * FROM tutors';
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports={getComments, getTutors}