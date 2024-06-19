const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'learnHubDB',
  port: 3306,
  //password: 'rySQL2024',
   password: 'mysql24',
}).promise();

module.exports = pool;