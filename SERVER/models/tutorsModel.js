const pool = require('../DB');



async function getTutors() {
    try {
        //const sql = 'SELECT CONCAT(u.firstName," ", u.lastName) AS tutorName, f.fileUrl FROM users u JOIN tutors t ON u.userId = t.tutor_id JOIN files_for_tutors a ON t.tutor_id = a.tutor_id JOIN files f ON a.file_id = f.file_id';
        const sql='SELECT u.userId,u.firstName,u.lastName,u.email,u.phone,u.gender,u.birth_date,a.city,a.street,a.house_number,t.intended_for_gender,GROUP_CONCAT(DISTINCT sub.subjectName) AS subjects,GROUP_CONCAT(DISTINCT lang.language_name) AS languages,GROUP_CONCAT(DISTINCT f.fileUrl) AS fileUrls FROM users u JOIN tutors t ON u.userId = t.tutor_id LEFT JOIN addresses a ON u.address_id = a.address_id LEFT JOIN subject_of_tutor sot ON t.tutor_id = sot.tutor_id LEFT JOIN subjects sub ON sot.subject_id = sub.subject_id LEFT JOIN tutors_languages tl ON t.tutor_id = tl.tutor_id LEFT JOIN languages lang ON tl.language_id = lang.language_id LEFT JOIN files_for_tutors fft ON t.tutor_id = fft.tutor_id LEFT JOIN files f ON fft.file_id = f.file_id GROUP BY u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, t.intended_for_gender'
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}
module.exports={getTutors}