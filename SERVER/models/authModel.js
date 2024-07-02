async function getUser(email, password) {
    try {
        const sql = (`SELECT * FROM users WHERE email = ?`, [email]);
        const [rows, fields] = await pool.query(sql);
        return rows;
    }
    catch (err) {
        throw err;
    }
}


async function getRole(user) {
    try {
        const sql = (`SELECT rollName FROM rolls r JOIN roll_for_user ru ON r.rollId = ru.rollId WHERE ru.userId = ?`[user.userId]);
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = { getUser, getRole }
