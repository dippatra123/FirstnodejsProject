// index.js
const express = require("express");
const db = require("./db");
const app = express();
const ExcelJS = require("exceljs");

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Route: Get all employees
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM emp_list");
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Something went wrong");
  }
});
//excel
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM emp_list");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    // Add header row based on keys
    worksheet.columns = Object.keys(rows[0]).map((key) => ({
      header: key,
      key: key,
      width: 20,
    }));

    // Add all rows
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Set content type and disposition
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=employees.xlsx");

    // Send the workbook
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel export error:", err);
    res.status(500).send("Failed to generate Excel");
  }
});
// Route: Get students with marks > 80
app.get("/api/user", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM student_list");

    const filtered = rows.filter((student) => student.marks > 80);

    res.json(filtered);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
