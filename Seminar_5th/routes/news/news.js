/*
 Default module
*/
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const async = require('async');
const mysql = require('mysql');
const bodyParser = require('body-parser');

/*
 Custom module
*/
const pool = require('../../config/dbPool');
const saltValue = require('../../config/secretKey').key;
/*
 Method : Get
*/


/*
 Method : Post
*/
router.post('/', function (req, res) {
    var n_id = req.body.n_id;

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function (conn, callback) {
            var firstQuery = 
            `
            select n.n_content from news as n where n.n_id = ? ;
            `;
            conn.query(firstQuery, [n_id], function (err, data) {
                if (err) callback(err, null);
                else {   
                    res.status(200).send({
                        content : data[0]
                    });
                    conn.release();
                    callback(null,"Select Detail News Success");
                }
            });
        }
    ];

    async.waterfall(taskArray, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});


router.post('/past3days', function (req, res) {
    var c_id = req.body.c_id;

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function (conn, callback) {
            var firstQuery = 
            `
            select * from news as n, category as c where c.c_id = ? and c.c_id = n.c_id 
            and date(n.n_date) >= date(subdate(now(), INTERVAL 3 DAY)) and date(n.n_date) <= date(now())
            `;
            conn.query(firstQuery, [c_id], function (err, data) {
                if (err) callback(err, null);
                else {   
                    res.status(200).send({
                        content : data
                    });
                    conn.release();
                    callback(null,"Select Past 3 days News ");
                }
            });
        }
    ];

    async.waterfall(taskArray, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

router.post('/over3days', function (req, res) {
    var c_id = req.body.c_id;

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function (conn, callback) {
            var firstQuery = 
            `
            delete from news
            where news.c_id = ? and date(news.n_date) < date(subdate(now(), INTERVAL 3 DAY))
            `;
            conn.query(firstQuery, [c_id], function (err, data) {
                if (err) callback(err, null);
                else {   
                    res.status(200).send({
                        content : data
                    });
                    conn.release();
                    callback(null,"Select Over 3 days News ");
                }
            });
        }
    ];

    async.waterfall(taskArray, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});





module.exports = router;
