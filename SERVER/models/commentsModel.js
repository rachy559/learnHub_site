const pool = require('../DB');

async function getComments() {
    try {
    const sql ='SELECT c.comment_date AS dateComment,c.body AS bodyComment, CONCAT(su.firstName ," ", su.lastName) AS studentName FROM comments c JOIN students st ON c.student_id = st.student_id JOIN users su ON st.student_id = su.userId '  
    const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function createNewComment(comment_date, body, student_id) {
    try {
        const sql = `INSERT INTO comments (comment_date, body, student_id) VALUES (?, ?, ?)`;
        const [rows, fields] = await pool.query(sql,[comment_date, body, student_id]);
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports={getComments, createNewComment}











