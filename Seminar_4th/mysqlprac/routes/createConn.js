const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConfig = {
	host : 'localhost', //연결할 대상의 IP or DNS 주소
	port : '3306', //Port번호, 주로 MySQL의 Default인 3306을 쓴다
	user : 'root', //연결할 대상의 계정
	password : 'poiu0987', //비밀번호
	database : 'sopt21th' //접속할 schema 이름
};

//테이블에 저장된 모든 영화정보를 조회
router.get('/', (req, res)=> {
	let connection = mysql.createConnection(dbConfig); //
	let selectAllQuery = 'select * from movies';
	connection.query(selectAllQuery, (err, movies) => {
		if(err){
			res.status(500).send({
				stat : "fail",
				msg : "loading movies data fail"
			});
			connection.end();
			console.log("select all query error : "+ err);
		}
		else{
			res.status(200).send({
				stat : "success",
				data : movies,
				msg : "successful loading movies data"
			});
			connection.end();
			console.log("successful loading movies data");
		}
	});
});

module.exports = router;