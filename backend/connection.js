const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6525156",
    password: "jrLlS5Pv9j",
    database: "sql6525156",
    port: 3306,
  });

module.exports = connection;