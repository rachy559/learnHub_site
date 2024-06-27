const pool = require('../DB');

async function createSingleStudent(studentStatus,userId) {
    try {
        console.log("t",userId,studentStatus)
        const sql="INSERT INTO students (`student_id`,`studentStatus`) VALUES(?,?)";
        await pool.query(sql, [userId, studentStatus]);
        return userId;
    } catch (err) {
        throw err;
    }
}

async function getSingleStudent(id) {
    try {
        console.log("model",id)
        const sql=`SELECT 
    s.student_id,
    s.studentStatus,
    u.firstName,
    u.lastName,
    u.email,
    u.phone,
    u.gender,
    u.birth_date,
    a.city,
    a.street,
    a.house_number
FROM 
     users u
JOIN 
    students s ON s.student_id = u.userId
LEFT JOIN 
    addresses a ON u.address_id = a.address_id
WHERE 
    u.userId = ?;
`
        const result = await pool.query(sql, [id]);
        console.log(result)
        return result[0];
    } catch (err) {
        throw err;
    }
}

module.exports = { createSingleStudent,getSingleStudent }