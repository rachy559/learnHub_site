const pool = require('../DB');

async function getComments() {
    try {
    const sql ='SELECT c.comment_date AS dateComment,c.body AS bodyComment, CONCAT(su.firstName ," ", su.lastName) AS studentName,CONCAT(tu.firstName," ", tu.lastName) AS tutorName,sb.subjectName AS nameOfSubject FROM comments c JOIN students st ON c.student_id = st.student_id JOIN users su ON st.student_id = su.userId JOIN tutors t ON c.tutor_id = t.tutor_id JOIN users tu ON t.tutor_id = tu.userId JOIN lessons l ON c.lesson_id = l.lesson_id JOIN subject_of_lesson sol ON l.lesson_id = sol.lesson_id JOIN subjects sb ON sol.subject_id = sb.subject_id'  
    const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

// async function getTutors() {
//     try {
//         const sql = 'SELECT CONCAT(u.firstName," ", u.lastName) AS tutorName, f.fileUrl FROM users u JOIN tutors t ON u.userId = t.tutor_id JOIN files_for_tutors a ON t.tutor_id = a.tutor_id JOIN files f ON a.file_id = f.file_id';
//         const [rows, fields] = await pool.query(sql);
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }

module.exports={getComments, getTutors}











