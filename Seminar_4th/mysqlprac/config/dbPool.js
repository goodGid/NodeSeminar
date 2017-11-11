const mysql = require('mysql');
const dbConfig = {
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'poiu0987',
	database : 'sopt21th',
	connectionLimit : 10
};

module.exports = mysql.createPool(dbConfig);