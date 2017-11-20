/*
 Default module
*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');

/*
 Custom module
*/

const pool = require('../../config/dbPool');

/*
 router.use
*/


/*
 Function Sector
*/


/*
 Method : Get
*/
router.get('/',(req,res) => {
    let taskArray = [
        // 1. Make Connection
        function(callback){
            pool.getConnection(function(err, conn){
                if(err){
                    res.status(500).send({
                        msg : "fail"
                    });
                    callback(err);
                }
                else{
                    callback(null,conn);
                }
            });
        },


        // 2. Get This Recipe from My SQL
        function(conn, callback){
            let selectThisWeekQuery = 
            `
            select * from recipes where postTime = ?
            `;

            conn.qeury(selectThisWeekQuery, [moment().format("YYYYMMDDhhmmss")], function(err, result) {
                if(err){
                    res.status(500).send({
                        msg: 'fail'
                    });
                    conn.release();
                    callback(err);
                }
                else {
                    let thisWeek = {
                        id : result[0].recipe_id,
                        title : result[0].recipe_title,
                        cookingTime : result[0].recipe_cookingTime
                    }
                    callback(null, conn, thisWeek, callback);
                }
            });
        },


        // 3. Get Last Week Recipe from My SQL
        function(conn, thisWeek, callback){
            let selectThisWeekQuery = 
            `
            select * from recipes where postTime = ?
            `;

            conn.qeury(selectThisWeekQuery, [moment().format("YYYYMMDDhhmmss")], function(err, result) {
                if(err){
                    res.status(500).send({
                        msg: 'fail'
                    });
                    conn.release();
                    callback(err);
                }
                else {
                    let dataArray = [];
                    for(let i=0; i<result.length; i++){
                        let data = {
                            id : result[0].recipe_id,
                            title : result[0].recipe_title,
                            cookingTime : result[0].recipe_cookingTime
                        }
                        dataArray.push(data);
                    }
                    conn.release();
                    callback(null, thisWeek, dataArray);
                }
            });
        },

        // 4. Send Response
        function(thisWeek, pastWeek, callback){
            res.status(200).send({ // Get 요청이니까 [status : 200]
                msg : "success",
                data : {
                    current : thisWeek,
                    past : pastWeek
                }
            });
            callback(null, "Success !");
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