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



/*
 Variable declaration 
*/

/*
 Function Sector
*/

/*
 Method : Get
*/
        

/*
 Method : Post
*/
router.post('/', function(req, res)
{
    var name = req.body.u_name;
    var pwd = req.body.u_pwd;

    let taskArray = [
        function(callback) {
        crypto.pbkdf2(pwd, saltValue, 100000, 64, 'sha512', function(err, hashed) {
            if (err) callback(err, null);
            else callback(null, hashed.toString('base64'));
          });
        },
        function(afterHashing, callback) {
            pwd = afterHashing.toString('base64');
            pool.getConnection((err, connection) => {
                if(err) callback(err, null);
                else callback(null, connection);
              });
        },
        function(connection, callback){
            var firstQuery = "select * from users where u_name = ?";
            connection.query(firstQuery, name, function(err, rows) {
                console.log("rows.length : " + rows.length);
                if(err) callback(err, null);
                else callback(null, rows.length,connection);
            });
        },
        function(name_chk, connection , callback){
            if(name_chk != 0){
                res.status(200).send({
                    stat : "Name already exist !",
                });
                connection.release();
                callback(null, "Name already exist");
            }
            else{
                var secondQuery = 
                `
                insert into users (u_name, u_pwd) 
                values(?,?)
                `;

                connection.query(secondQuery, [name,pwd], function(err, rows) {
                    if(err) {
                        callback(err);
                    }
                    else {   
                        res.status(200).send({
                            stat : "success",
                        });
                        connection.release();  // 반드시 해제해야 합니다.
                        callback(null, "Successful Register");
                    }
                });
                }
            }
      ];

      async.waterfall(taskArray, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    });


module.exports = router;
