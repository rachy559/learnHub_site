const pool = require('../DB');

async function createFile(fileUrl,tutor_id) {
    try {
        const sql = `INSERT INTO files (fileUrl) VALUES (?)`;
        const result = await pool.query(sql, [fileUrl]);
        const sql2 = `INSERT INTO files_for_tutors (file_id,tutor_id) VALUES (?,?)`;
        const result2 = await pool.query(sql, [result[0].insertId,tutor_id]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

module.exports = { createFile};
