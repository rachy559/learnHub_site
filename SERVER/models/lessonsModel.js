const pool = require('../DB');

async function getLessons() {
    try {
        const sql = `SELECT 
    CONCAT(u.firstName, ' ', u.lastName) AS tutor_name,
    s.subjectName AS subject,
    l.language_name AS language,
    le.priceLesson AS price,
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
        console.log("ee",rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = { getLessons };
