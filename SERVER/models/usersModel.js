const pool = require('../DB');


async function getUser(userId) {
    try {
        const sql=`SELECT * FROM users JOIN addresses where userId=?`;
        const [rows, fields] = await pool.query(sql,[userId]);
        console.log("r",rows)
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

async function createUser(firstName,lastName,email,phone,gender,birth_date,rollId,password,city,street,house_number) {
    try {
        const sql1 = "INSERT INTO addresses (`city`,`street`,`house_number`) VALUES(?,?,?)";
        const result1 =await pool.query(sql1, [city,street,house_number]);
        const address_id = result1[0].insertId;
        console.log(address_id)

        const sql = "INSERT INTO users (`firstName`, `lastName`, `email`, `phone`, `gender`, `birth_date`,`address_id`) VALUES(?,?,?,?,?,?,?)";
        const result = await pool.query(sql, [firstName,lastName,email,phone,gender,birth_date,address_id]);
        console.log("resu",result[0][0],result[0])
        const userId = result[0].insertId;

        const sql2 = "INSERT INTO passwords (`userId`, `password`) VALUES(?, ?)";
        await pool.query(sql2, [userId, password]);
        
        const sql3 = "INSERT INTO roll_for_user (`userId`, `rollId`) VALUES(?, ?)";
        await pool.query(sql3, [userId, rollId]);
        return userId; 

    } catch (err) {
        console.log(err);
        throw err;
    }
}




module.exports = { getPassword, getByEmail, getUsers, createUser, getUser}