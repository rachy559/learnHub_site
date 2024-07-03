const pool = require('../DB');



async function getTutors(limit) {
    try {
        const sql = `SELECT CONCAT(u.firstName," ",u.lastName," ") AS tutorName,u.email,u.phone,u.gender,u.birth_date,CONCAT(a.city,", ",a.street," ",a.house_number," ") AS tutorAddress,t.intended_for_gender,GROUP_CONCAT(DISTINCT sub.subjectName) AS subjects,GROUP_CONCAT(DISTINCT lang.language_name) AS languages,GROUP_CONCAT(DISTINCT f.fileUrl) AS fileUrls FROM users u JOIN tutors t ON u.userId = t.tutor_id LEFT JOIN addresses a ON u.address_id = a.address_id LEFT JOIN subject_of_tutor sot ON t.tutor_id = sot.tutor_id LEFT JOIN subjects sub ON sot.subject_id = sub.subject_id LEFT JOIN tutors_languages tl ON t.tutor_id = tl.tutor_id LEFT JOIN languages lang ON tl.language_id = lang.language_id LEFT JOIN files_for_tutors fft ON t.tutor_id = fft.tutor_id LEFT JOIN files f ON fft.file_id = f.file_id GROUP BY u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, t.intended_for_gender LIMIT ${limit}`
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function createSingleTutor(intended_for_gender, subjects, languages, userId) {
    try {
        const languageArray = languages.split(',');
        const sql1Check = "SELECT language_name FROM languages WHERE language_name = ?";
        const sql1 = "INSERT INTO languages (language_name) VALUES(?)";
        for (const language of languageArray) {
            if (language) {
                const [rows] = await pool.query(sql1Check, [language]);
                if (rows.length === 0) {
                    await pool.query(sql1, [language]);
                }
            }
        }

        const subjectsArray = subjects.split(',');
        const sql2Check = "SELECT subjectName FROM subjects WHERE subjectName = ?";
        const sql = "INSERT INTO subjects (`subjectName`) VALUES(?)";
        for (const subject of subjectsArray) {
            if (subject) {
                const [rows] = await pool.query(sql2Check, [subject]);
                if (rows.length === 0) {
                    await pool.query(sql, [subject]);
                }
            }
        }

        const sql2 = "INSERT INTO tutors (`tutor_id`, `intended_for_gender`) VALUES(?, ?)";
        await pool.query(sql2, [userId, intended_for_gender]);
 

        const sql3 = "INSERT INTO subject_of_tutor (`tutor_id`, `subject_id`) VALUES(?, ?)";
        for (const subject of subjectsArray) {
            const sql5 = `SELECT * from subjects where subjectName=?`;
            const result = await pool.query(sql5, [subject]);
            console.log("h", result[0][0])
            if (subject) {
                await pool.query(sql3, [userId, result[0][0].subject_id]);
            }
        }

        const sql4 = "INSERT INTO tutors_languages (`tutor_id`, `language_id`) VALUES(?, ?)";
        for (const language of languageArray) {
            const sql6 = `SELECT * from languages where language_name=?`;
            const result1 = await pool.query(sql6, [language]);
            if (language) {
                await pool.query(sql4, [userId, result1[0][0].language_id]);
            }
        }
        return userId;

    } catch (err) {
        console.log(err);
        throw err;
    }
}


async function getSingleTutor(id) {
    try {
        console.log("e", id)
        const sql = `SELECT
    JSON_OBJECT(
        'user_id', u.userId,
        'first_name', u.firstName,
        'last_name', u.lastName,
        'email', u.email,
        'phone', u.phone,
        'gender', u.gender,
        'birth_date', u.birth_date,
        'city', a.city,
        'street', a.street,
        'house_number', a.house_number,
        'intended_for_gender', t.intended_for_gender,
        'subjects', GROUP_CONCAT(DISTINCT sub.subjectName),
        'lessons', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'lesson_id', le.lesson_id,
                    'lesson_level', le.levelLesson,
                    'lesson_time', le.lessonTime,
                    'lesson_date', lfs.dateLesson,
                    'lesson_day', lfs.dayLesson,
                    'timeLesson', lfs.timeLesson,
                    'lesson_price', le.priceLesson,
                    'zoom_link', le.zoomLink,
                    'student_first_name', stu.firstName,
                    'student_last_name', stu.lastName
                )
            )
            FROM lessons le
            LEFT JOIN lesson_for_student lfs ON le.lesson_id = lfs.lesson_id
            LEFT JOIN users stu ON lfs.student_id = stu.userId
            WHERE le.tutor_id = t.tutor_id
        ),
        'available_times', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'available_day', cw.dayLesson,
                    'available_times', cw.timesAvaliablePerDay
                )
            )
            FROM calander_work cw
            WHERE cw.tutorId = t.tutor_id
        )
    ) AS tutor_details
FROM
    users u
JOIN 
    tutors t ON u.userId = t.tutor_id
LEFT JOIN 
    addresses a ON u.address_id = a.address_id
LEFT JOIN 
    subject_of_tutor sot ON t.tutor_id = sot.tutor_id
LEFT JOIN 
    subjects sub ON sot.subject_id = sub.subject_id
WHERE 
    t.tutor_id = ?
GROUP BY
    u.userId, 
    u.firstName, 
    u.lastName, 
    u.email, 
    u.phone, 
    u.gender, 
    u.birth_date,
    a.city, 
    a.street, 
    a.house_number,
    t.intended_for_gender;

    `;
        const response = await pool.query(sql, [id]);
        console.log("ee", response[0])
        return response[0];
    } catch (err) {
        throw err;
    }
}

module.exports = { getTutors, createSingleTutor, getSingleTutor }