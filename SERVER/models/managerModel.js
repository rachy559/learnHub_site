const pool = require('../DB');
async function getManagerDetails(userId) {
    try {
        const sql = `
        SELECT 
    u.firstName AS first_name,
    u.lastName AS last_name,
    u.birth_date,
    a.city,
    a.street,
    a.house_number,
    u.email,
    u.phone,
    m.numAccount,
    m.numBranch,
    m.nameBank,
    m.numBank,
    m.beneficiaryName
FROM 
    users u
JOIN 
    roll_for_user rfu ON u.userId = rfu.userId
JOIN 
    addresses a ON u.address_id = a.address_id
JOIN 
    manager m ON u.userId = m.manager_id
WHERE 
    rfu.rollId = 1;
`;
        const manager=await pool.query(sql, [userId]);
        return manager[0][0];
    } catch (err) {
        console.error(err);
        console.error(err);
        throw err;
    }
}

module.exports = { getManagerDetails };
