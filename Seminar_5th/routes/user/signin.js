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
    var name = req.body.u_name;
    var pwd = req.body.u_pwd;

    let taskArray = [
        function (callback) {
            pool.getConnection((err, connection) => {
                if(err) callback(err,null);
                else callback(null,connection);
            });   
        },
        function(connection, callback){
            crypto.pbkdf2(pwd, saltValue, 100000, 64, 'sha512', function(err, hashed) {
                if (err) callback(err, null);
                else callback(null, connection, hashed.toString('base64'));
              }); 
        },
        function (connection, afterHashing, callback) {
            var firstQuery = "select u_name from users where u_name = ? and u_pwd = ?";
            connection.query(firstQuery, [name, afterHashing], function (err, data) {
                if (err) callback(err, null);
                else {
                    if( data.length == 0){
                        res.status(200).send({
                            stat: " Login Fail "
                        });
                        connection.release();
                        callback(null,"Login Fail");
                    }
                    else{
                        res.status(200).send({
                            name : data[0].u_name
                        });
                        connection.release();  // 반드시 해제해야 합니다.
                        callback(null, "Login Success");
                    }
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
