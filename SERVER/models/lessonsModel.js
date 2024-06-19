const pool = require('../DB');



async function getLenguages() {
    try {
        const sql=`SELECT language_name FROM languages`
        const [rows, fields] = await pool.query(sql);
        return rows;
    } catch (err) {
        throw err;
    }
}
module.exports = { getLenguages }