const pool = require('../DB');

async function createSingleStudent(studentStatus, userId) {
    try {
        const sql = "INSERT INTO students (`student_id`,`studentStatus`) VALUES(?,?)";
        await pool.query(sql, [userId, studentStatus]);
        return userId;
    } catch (err) {
        throw err;
    }
}

async function getSingleStudent(id) {
    try {
        const sql=`
        SELECT
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
        'studentStatus', st.studentStatus,
        'lessons', JSON_ARRAYAGG(
            JSON_OBJECT(
                'lesson_id', l.lesson_id,
                'lesson_level', l.levelLesson,
                'lesson_time', l.lessonTime,
                'lesson_date', lfs.dateLesson,
                'lesson_day', lfs.dayLesson,
                'timeLesson', lfs.timeLesson,
                'lesson_price', l.priceLesson,
                'zoom_link', l.zoomLink,
                'tutor_intended_gender', t.intended_for_gender,
                'subject_name', s.subjectName,
                'lesson_language', lang.language_name,
                'tutor_id', tu.userId,
                'tutor_name', CONCAT(tu.firstName, ' ', tu.lastName),
                'tutor_address', JSON_OBJECT(
                    'city', ta.city,
                    'street', ta.street,
                    'house_number', ta.house_number
                )
            )
        ),
        'manager_details', JSON_OBJECT(
            'numAccount', m.numAccount,
            'numBranch', m.numBranch,
            'nameBank', m.nameBank,
            'numBank', m.numBank,
            'beneficiaryName', m.beneficiaryName
        )
    ) AS student_details
FROM
    students st
    JOIN users u ON st.student_id = u.userId
    JOIN addresses a ON u.address_id = a.address_id
    LEFT JOIN lesson_for_student lfs ON st.student_id = lfs.student_id
    LEFT JOIN lessons l ON lfs.lesson_id = l.lesson_id
    LEFT JOIN tutors t ON l.tutor_id = t.tutor_id
    LEFT JOIN subject_of_lesson sol ON l.lesson_id = sol.lesson_id
    LEFT JOIN subjects s ON sol.subject_id = s.subject_id
    LEFT JOIN lesson_languages ll ON l.lesson_id = ll.lesson_id
    LEFT JOIN languages lang ON ll.language_id = lang.language_id
    LEFT JOIN users tu ON l.tutor_id = tu.userId
    LEFT JOIN addresses ta ON tu.address_id = ta.address_id
    LEFT JOIN manager m ON TRUE -- מבצע הצטרפות לטבלת המנהלים בלי תנאי
WHERE
    st.student_id = ?
GROUP BY
    u.userId, u.firstName, u.lastName, u.email, u.phone, u.gender, u.birth_date, a.city, a.street, a.house_number, st.studentStatus, m.numAccount, m.numBranch, m.nameBank, m.numBank, m.beneficiaryName;
        `
        const result = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}


module.exports = { createSingleStudent, getSingleStudent }