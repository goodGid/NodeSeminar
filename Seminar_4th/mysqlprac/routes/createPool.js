const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../config/dbPool');

//category에 따른 영화들의 총 관객수를 보여줌, Method : get
router.get('/:category', (req, res) => {
	let taskArray = [
		//1. connection을 pool로부터 가져옴
		(callback) => {
			pool.getConnection((err, connection) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "DB connection error"
					});
					callback("DB connection err : " + err);
				} else callback(null, connection);
			});
		},
		//2. 쿼리를 실행하여 총 관객수를 계산
		(connection, callback) => {
			let selectAtdQuery = 'select movie_attendance from movies where movie_category = ?';
			connection.query(selectAtdQuery, req.params.category, (err, data) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "DB connection error"
					});
					connection.release();
					callback("select attendance query error : "+ err);
				} else{
					//data에 해당 카테고리에 해당하는 총 관객수들을 배열로 가져옴
					let totalAttendance = 0;
					//for문으로 총 관객수 합산
					for(let i = 0; i < data.length; i++){
						totalAttendance += data[i].movie_attendance;
					}
					res.status(200).send({
						stat : "success",
						data : totalAttendance,
						msg : "successful loading total attendance by category"
					});
					connection.release();
					callback(null, "successful loading totalAttendance");
				}
			});
		}
	];
	async.waterfall(taskArray , (err, result)=> {
		if(err) console.log(err);
		else console.log(result);
	});
});

//새로운 영화 등록, Method : POST
router.post('/registration', (req, res) => {
	let taskArray = [
		//1. connection을 pool로부터 가져옴
		(callback) => {
			pool.getConnection((err, connection) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "DB connection err"
					});
					callback("DB connection err : "+ err);
				} else callback(null, connection);
			});
		},
		//2. 쿼리를 사용해 DB에 insert
		(connection, callback) => {
			let insertMovieQuery = 'insert into movies values(?,?,?,?,?)';
			connection.query(insertMovieQuery, [null, req.body.title, req.body.category,0,203], (err) => {
				if(err){
					res.status(500).send({
						stat : "fail",
						msg : "fail regist movie"
					});
					connection.release();
					callback("insert movies query err : "+ err);
				} else{
					res.status(201).send({
						stat : "success",
						msg : "successful regist movie"
					});
					connection.release();
					callback(null, "successful resist movie");
				}
			});
		}
	];
	async.waterfall(taskArray, (err, result) => {
		if(err) console.log(err);
		else console.log(result);
	});
});

module.exports = router;