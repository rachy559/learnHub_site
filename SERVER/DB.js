const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'learnHubDB',
//   port: 3306,
//   password: 'rySQL2024',
//   // password: 'mysql24',
// }).promise();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT
// password: 'mysql24',
//   password: 'rySQL2024',
}).promise();

module.exports = pool;