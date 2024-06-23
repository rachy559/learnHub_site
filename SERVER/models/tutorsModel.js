const pool = require('../DB');



async function getTutors(limit) {
    try {
        const sql=`SELECT CONCAT(u.firstName," ",u.lastName," ") AS tutorName,u.email,u.phone,u.gender,u.birth_date,CONCAT(a.city,", ",a.street," ",a.house_number," ") AS tutorAddress,t.intended_for_gender,GROUP_CONCAT(DISTINCT sub.subjectName) AS subjects,GROUP_CONCAT(DISTINCT lang.language_name) AS languages,GROUP_CONCAT(DISTINCT f.fileUrl) AS fileUrls FROM users u JOIN tutors t ON u.userId = t.tutor_id LEFT JOIN addresses a ON u.address_id = a.address_id LEFT JOIN subject_of_tutor sot ON t.tutor_id = sot.tutor_id LEFT JOIN subjects sub ON sot.subject_id = sub.subject_id LEFT JOIN tutors_languages tl ON t.tutor_id = tl.tutor_id LEFT JOIN languages lang ON tl.language_id = lang.language_id LEFT JOIN files_for_tutors fft ON t.tutor_id = fft.tutor_id LEFT JOIN files f ON fft.file_id = f.file_id GROUP BY u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, t.intended_for_gender LIMIT ${limit}`
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function createSingleTutor(intended_for_gender,subjects,languages,userId) {
    try {
        console.log("i",userId)
        const languageArray = languages.includes(',') ? languages.split(',') : languages.split(' ');
        const trimmedLanguages = languageArray.map(language => language.trim());
        
        const sql1 = "INSERT INTO languages (language_name) VALUES(?)";
        for (const language of trimmedLanguages) {
            if (language) {
                await pool.query(sql1, [language]);
            }
        }
        
          const subjectsArray = subjects.split(' ').map(subject => subject.trim());
          const sql = "INSERT INTO subjects (`subjectName`) VALUES(?)";
          for (const subject of subjectsArray) {
              if (subject) {
                await pool.query(sql, [subject]);
              }
            }

        const sql2 = "INSERT INTO tutors (`tutor_id`, `intended_for_gender`) VALUES(?, ?)";
        await pool.query(sql2, [userId, intended_for_gender]);

        // const sql3 = "INSERT INTO subject_of_tutor (`tutor_id`, `subject_id`) VALUES(?, ?)";
        // await pool.query(sql2, [userId, subject]);

        // const sql4 = "INSERT INTO tutors (`tutor_id`, `intended_for_gender`) VALUES(?, ?)";
        // await pool.query(sql2, [userId, language]);
        return userId; 

    } catch (err) {
        console.log(err);
        throw err;
    }
}



module.exports = { getTutors,createSingleTutor }