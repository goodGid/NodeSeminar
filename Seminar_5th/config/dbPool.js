const mysql = require('mysql');
const dbConfig = {
	host : 'rds-goodgid.c4hdhslyc6js.ap-northeast-2.rds.amazonaws.com',
	port : '3306',
	user : 'goodgid',
	password : 'rldyd0413!',
	database : '5th_homework',
	connectionLimit : 10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;
