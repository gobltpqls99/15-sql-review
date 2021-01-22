"use strict";

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'sb',
  password: '000000',
  database: 'book'
});
module.exports = {
  mysql: mysql,
  connection: connection
};