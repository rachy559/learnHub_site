const pool = require('../DB');


async function getUser(userId) {
    try {
        const sql=`SELECT u.*, a.city, a.street, a.house_number
            FROM users u
            INNER JOIN addresses a ON u.address_id = a.id
            WHERE u.userId = ?
        `;
        const [rows, fields] = await pool.query(sql,[userId]);
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getUsers(query) {
    try {
        console.log(query.email)
        const sql=`SELECT * FROM users NATURAL JOIN addresses where email=?`;
        const [rows, fields] = await pool.query(sql,[query.email]);
        console.log("r",rows)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getByEmail(email) {
    try {
        console.log("e",email);
        const sql = `
            SELECT 
                u.userId,
                u.firstName,
                u.lastName,
                u.email,
                u.phone,
                u.createDate,
                u.gender,
                u.birth_date,
                a.city, 
                a.street,
                a.house_number,
                GROUP_CONCAT(r.rollName SEPARATOR ', ') AS roles
            FROM users u
            LEFT JOIN addresses a ON u.address_id = a.address_id
            LEFT JOIN roll_for_user rf ON u.userId = rf.userId
            LEFT JOIN rolls r ON rf.rollId = r.rollId
            WHERE u.email = ?
            GROUP BY u.userId
        `;
        const result = await pool.query(sql, [email]);
        console.log('resolt',result);
        console.log('resolt0',result[0]);
        console.log('resolt00',result[0][0]);
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

async function createUser(firstName,lastName,email,phone,gender,birth_date,rollId,password,city,street,house_number,createDate) {
    try {
        const sql1 = "INSERT INTO addresses (`city`,`street`,`house_number`) VALUES(?,?,?)";
        const result1 =await pool.query(sql1, [city,street,house_number]);
        const address_id = result1[0].insertId;
        console.log(address_id)

        const sql = "INSERT INTO users (`firstName`, `lastName`, `email`, `phone`, `gender`, `birth_date`,`createDate`,`address_id`) VALUES(?,?,?,?,?,?,?,?)";
        const result = await pool.query(sql, [firstName,lastName,email,phone,gender,birth_date,createDate,address_id]);
        console.log("resu",result[0][0],result[0])
        const userId = result[0].insertId;

        const sql2 = "INSERT INTO passwords (`userId`, `password`) VALUES(?, ?)";
        await pool.query(sql2, [userId, password]);
        
        const sql3 = "INSERT INTO roll_for_user (`userId`, `rollId`) VALUES(?, ?)";
        console.log("role",rollId)
        await pool.query(sql3, [userId, rollId]);
        return userId; 

    } catch (err) {
        console.log(err);
        throw err;
    }
}


async function getAllNotConfirmTutors() {
    try {
        const sql = `SELECT users.*
        FROM users
        JOIN roll_for_user ON users.userId = roll_for_user.userId
        WHERE roll_for_user.rollId = 4;`
        const [rows, fields] = await pool.query(sql);
        console.log(rows)
        return rows;
    } catch (err) {
        throw err;
    }
}



module.exports = { getPassword, getByEmail, getUsers, createUser, getUser, getAllNotConfirmTutors}