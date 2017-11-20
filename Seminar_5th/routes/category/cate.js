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

/*
 Method : Post
*/
router.post('/', function (req, res) {
    var cate = req.body.c_id;

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
            select * from news as n, category as c 
                     where c.c_id = ? and c.c_id = n.c_id;
            `;
            conn.query(firstQuery, [cate], function (err, data) {
                if (err) callback(err, null);
                else {
                    res.status(200).send({
                        data : data
                    });
                    conn.release();
                    callback(null,"Select News Success");
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