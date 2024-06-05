const pool = require('../DB');

async function getComments() {
    try {
        const sql='SELECT student_users.firstName AS student_first_name, student_users.lastName AS student_last_name, tutor_users.firstName AS tutor_first_name, tutor_users.lastName AS tutor_last_name, subjects.subjectName AS lesson_subject, comments.comment_date AS comment_date, comments.body AS comment_body FROM comments JOIN   students ON comments.student_id = students.student_id JOIN lessons ON comments.lesson_id = lessons.lesson_id JOIN  tutors ON lessons.tutor_id = tutors.tutor_id JOIN  users AS student_users ON students.student_id = student_users.userId JOIN  users AS tutor_users ON tutors.tutor_id = tutor_users.userId JOIN subject_of_lesson ON lessons.lesson_id = subject_of_lesson.lesson_id JOIN subjects ON subject_of_lesson.subject_id = subjects.subject_id'
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











// SELECT 
//     student_users.firstName AS student_first_name,
//     student_users.lastName AS student_last_name,
//     tutor_users.firstName AS tutor_first_name,
//     tutor_users.lastName AS tutor_last_name,
//     subjects.subjectName AS lesson_subject,
//     comments.comment_date AS comment_date,
//     comments.body AS comment_body
// FROM 
//     (
//         SELECT 
//             comments.*,
//             students.student_id AS student_id,
//             lessons.tutor_id AS tutor_id
//         FROM 
//             comments
//         JOIN 
//             students ON comments.student_id = students.student_id
//         JOIN 
//             lessons ON comments.lesson_id = lessons.lesson_id
//     ) AS comments_with_ids
// JOIN 
//     users AS student_users ON comments_with_ids.student_id = student_users.userId
// JOIN 
//     users AS tutor_users ON comments_with_ids.tutor_id = tutor_users.userId
// JOIN
//     subject_of_lesson ON comments_with_ids.lesson_id = subject_of_lesson.lesson_id
// JOIN
//     subjects ON subject_of_lesson.subject_id = subjects.subject_id;
