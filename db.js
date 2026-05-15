const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DPsep@2020",
  database: "emp_database",
});

module.exports = db;
