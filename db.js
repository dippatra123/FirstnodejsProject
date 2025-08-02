// db.js
const mysql = require("mysql2/promise");

// Create and export a connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DPsep@2020", // 🛠️ replace with your real MySQL password
  database: "emp_database", // 🛠️ replace with your DB name
});

module.exports = db;
