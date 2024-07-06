const pool = require('../DB');

async function getLessons() {
    try {
        const sql = `SELECT 
    CONCAT(u.firstName, ' ', u.lastName) AS tutor_name,
    t.tutor_id,
    s.subjectName AS subject,
    l.language_name AS language,
    le.priceLesson AS price,
    le.lesson_id,
    le.zoomLink,
    le.lessonTime AS lesson_time,
    CASE
        WHEN le.zoomLink IS NOT NULL THEN 'אונליין'
        ELSE 'פרונטלי'
    END AS lesson_type,
    le.levelLesson AS level,
    CONCAT(a.street, ' ', a.house_number) AS street_tutor,
    a.city AS city_tutor,
    u.gender AS tutor_gender
FROM 
    lessons le
JOIN 
    tutors t ON le.tutor_id = t.tutor_id
JOIN 
    users u ON t.tutor_id = u.userId
JOIN 
    addresses a ON u.address_id = a.address_id
JOIN 
    subject_of_lesson sol ON le.lesson_id = sol.lesson_id
JOIN 
    subjects s ON sol.subject_id = s.subject_id
JOIN 
    lesson_languages ll ON le.lesson_id = ll.lesson_id
JOIN 
    languages l ON ll.language_id = l.language_id;
`;

        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function createLesson(levelLesson, lessonTime, priceLesson, zoomLink, tutor_id,language_name,subjectName) {
    try {
        const sql =  `INSERT INTO lessons (levelLesson, lessonTime, priceLesson, zoomLink, accessibility, tutor_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await pool.query(sql, [levelLesson, lessonTime, priceLesson, zoomLink,false, tutor_id]);
        const lesson_id = result[0].insertId;
        const sql1 =`SELECT subject_id FROM subjects WHERE subjectName = ?`;
        const result1 = await pool.query(sql1, [subjectName]);
        const subject_id = result1[0][0].subject_id;
        const sql2 =`INSERT INTO subject_of_lesson (lesson_id, subject_id) VALUES (?, ?)`;
        const result2 = await pool.query(sql2, [lesson_id, subject_id]);
        for (const languageName of language_name) {
        const sql3 =`SELECT language_id FROM languages WHERE language_name = ?`;
        const result3 = await pool.query(sql3, [languageName]);
        const language_id = result3[0][0].language_id;
        const sql4 =`INSERT INTO lesson_languages (lesson_id, language_id) VALUES (?, ?)`;
        const result4 = await pool.query(sql4, [lesson_id, language_id]);
    }
        return lesson_id;
    } catch (err) {
        throw err;
    }
}



module.exports = { getLessons ,createLesson};
