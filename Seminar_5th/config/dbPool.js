const mysql = require('mysql');
const dbConfig = {
	host : '',
	port : '',
	user : '',
	password : '!',
	database : '',
	connectionLimit : 10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;
