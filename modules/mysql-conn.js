const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'sb',
	password: '000000',
	database: 'book'
});

module.exports = { mysql, connection };