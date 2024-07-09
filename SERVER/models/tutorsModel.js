const pool = require('../DB');



async function getTutors() {
    try {
        const sql = `SELECT CONCAT(u.firstName," ",u.lastName," ") AS tutorName,u.email,u.phone,u.gender,u.birth_date,CONCAT(a.city,", ",a.street," ",a.house_number," ") AS tutorAddress,
        t.intended_for_gender,GROUP_CONCAT(DISTINCT sub.subjectName) AS subjects,
        GROUP_CONCAT(DISTINCT lang.language_name) AS languages,
        GROUP_CONCAT(DISTINCT f.fileUrl) AS fileUrls
         FROM users u JOIN tutors t ON u.userId = t.tutor_id 
         LEFT JOIN addresses a ON u.address_id = a.address_id 
         LEFT JOIN subject_of_tutor sot ON t.tutor_id = sot.tutor_id 
         LEFT JOIN subjects sub ON sot.subject_id = sub.subject_id 
         LEFT JOIN tutors_languages tl ON t.tutor_id = tl.tutor_id 
         LEFT JOIN languages lang ON tl.language_id = lang.language_id 
         LEFT JOIN files_for_tutors fft ON u.userId = fft.userId 
         LEFT JOIN files f ON fft.file_id = f.file_id 
         JOIN roll_for_user ON u.userId = roll_for_user.userId
         WHERE roll_for_user.rollId = 3
         GROUP BY u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, t.intended_for_gender`
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



async function createSingleTutor(intended_for_gender, subjects, languages, userId, days) {
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

        days.forEach(day => {
            const sql = "INSERT INTO calander_work (`tutorId`,`dayLesson`,`timesAvaliablePerDay`) VALUES (?,?,?)";
            const response = pool.query(sql, [userId, day, '']);
        });
        return userId;

    } catch (err) {
        console.log(err);
        throw err;
    }
}


async function getSingleTutor(id) {
    try {
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
        'languages', GROUP_CONCAT(DISTINCT lan.language_name),
        'lessons', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'lesson_id', le.lesson_id,
                    'lesson_level', le.levelLesson,
                    'lesson_time', le.lessonTime,
                    'lesson_date', lfs.dateLesson,
                    'lesson_day', lfs.dayLesson,
                    'lesson_subject',ss.subjectName,
                    'timeLesson', lfs.timeLesson,
                    'lesson_price', le.priceLesson,
                    'zoom_link', le.zoomLink,
                    'student_first_name', stu.firstName,
                    'student_last_name', stu.lastName
                )
            )
            FROM lessons le
            LEFT JOIN subject_of_lesson sol ON le.lesson_id = sol.lesson_id
            LEFT JOIN subjects ss ON sol.subject_id = ss.subject_id
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
LEFT JOIN 
    tutors_languages tul ON t.tutor_id = tul.tutor_id
LEFT JOIN 
    languages lan ON tul.language_id = lan.language_id
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
        return response[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getAllNotConfirmTutors() {
    try {
        console.log("erty")
        const sql = `SELECT CONCAT(u.firstName," ",u.lastName," ") AS tutorName,u.email,u.phone,u.createDate, u.gender,u.birth_date,CONCAT(a.city,", ",a.street," ",a.house_number," ") AS tutorAddress,
        t.intended_for_gender,GROUP_CONCAT(DISTINCT sub.subjectName) AS subjects,
        t.tutor_id,
        GROUP_CONCAT(DISTINCT lang.language_name) AS languages,
        GROUP_CONCAT(DISTINCT f.fileUrl) AS fileUrls
         FROM users u JOIN tutors t ON u.userId = t.tutor_id 
         LEFT JOIN addresses a ON u.address_id = a.address_id 
         LEFT JOIN subject_of_tutor sot ON t.tutor_id = sot.tutor_id 
         LEFT JOIN subjects sub ON sot.subject_id = sub.subject_id 
         LEFT JOIN tutors_languages tl ON t.tutor_id = tl.tutor_id 
         LEFT JOIN languages lang ON tl.language_id = lang.language_id 
         LEFT JOIN files_for_tutors fft ON u.userId = fft.userId 
         LEFT JOIN files f ON fft.file_id = f.file_id 
         JOIN roll_for_user ON u.userId = roll_for_user.userId
         WHERE roll_for_user.rollId = 4
         GROUP BY u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, t.intended_for_gender`
        const [rows, fields] = await pool.query(sql);
        console.log("ww", rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function updateRoleUser(id, rollId) {
    try {
        console.log("hello")
        const sql = `UPDATE roll_for_user
        SET rollId = ?  
        WHERE userId = ? `;
        const [rows, fields] = await pool.query(sql, [rollId, id]);
        console.log("r", rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function deleteTutor(tutorId) {
    try {
        console.log("hellokkkk")
        await pool.query('DELETE FROM subject_of_tutor WHERE tutor_id = ?', [tutorId]);
        await pool.query('DELETE FROM files_for_tutors WHERE userId = ?', [tutorId]);
        await pool.query('DELETE FROM tutors_languages WHERE tutor_id = ?', [tutorId]);
        await pool.query('DELETE FROM calander_work WHERE tutorId = ?', [tutorId]);
        await pool.query('DELETE FROM roll_for_user WHERE userId = ?', [tutorId]);
        await pool.query('DELETE FROM passwords WHERE userId = ?', [tutorId]);
        await pool.query('DELETE FROM tutors WHERE tutor_id = ?', [tutorId]);
        const response = await pool.query('DELETE FROM users WHERE userId = ?', [tutorId]);
        return response[0];   
    } catch (err) {
        throw err;
    }
}


module.exports = { getTutors, createSingleTutor, getSingleTutor, getAllNotConfirmTutors, updateRoleUser, deleteTutor }