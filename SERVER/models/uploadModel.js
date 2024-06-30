const pool = require('../DB');

// Function to insert file into 'files' table
async function createFile(fileUrl,tutor_id)
{
    try{
        console.log("file",fileUrl,tutor_id)
        const sql = 'INSERT INTO files (fileUrl) VALUES (?)';
        const sql2 = 'INSERT INTO files_for_tutors (file_id, tutor_id) VALUES (?, ?)';
        const result = await pool.query(sql,[fileUrl]);
        const file_id = result[0].insertId;
        const result1 = await pool.query(sql2,[file_id,tutor_id]);
        console.log("r",rows)
        return file_id;
    } catch (err) {
        throw err;
    }
    
};

module.exports = { createFile};
