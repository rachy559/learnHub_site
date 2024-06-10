const pool = require('../DB');


// async function getUserData() {
//     try {
//         const sql;
//         const [rows, fields] = await pool.query(sql);
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// }

async function getByUsername(email) {
    try {
        const sql = 'SELECT * FROM users natural join addresses where email=? ';
        const result = await pool.query(sql, [email]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getPassword(userId) {
    try {
        const sql = 'SELECT * FROM passwords where userId=? ';
        const result = await pool.query(sql, [userId]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getUser(id) {
    try {
        console.log(id)
        const sql = 'SELECT * FROM users NATURAL JOIN addresses where userId=?';
        const result = await pool.query(sql, [id]);
        console.log(result)
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { getPassword,getByUsername,getUser }