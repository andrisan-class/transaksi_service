"use strict";
const mysql = require("mysql");

//local mysql db connection
const dbConn = mysql.createConnection({
  //sesuain sama db kalian
  host: "localhost",
  user: "root",
  password: "",
  database: "mvcapp",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
