// const pool = require('../DB');

async function getUser(email, password) {
    try {
        const sql = `SELECT * FROM users WHERE email = ?`;
        const [rows, fields] = await pool.query(sql,[email]);
        return rows;
    }
    catch (err) {
        throw err;
    }
}

async function getRolls(userId) {   //מחזירה את כל התפקידים הקיימים עבור המשתמש המסוים
    try {
        const sql = `SELECT rollName FROM rolls r JOIN roll_for_user ru ON r.rollId = ru.rollId WHERE ru.userId = ?`;
        const [userRolls] = await db.query(sql, [userId]);
        return userRolls.map(roll => roll.rollName);
    } catch (err) {
        throw err;
    }
}

module.exports = { getUser, getRolls }
