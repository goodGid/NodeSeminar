const mysql = require('mysql');
const dbConfig = {
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : '8971',
	database : 'node_seminar',
	connectionLimit : 10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;
