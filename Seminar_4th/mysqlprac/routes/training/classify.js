/*
 default module
*/
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
var aws=require('aws-sdk');

/*
 custom module
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

router.get('/:attendance', (req, res) => {
    
    var attendance = req.params.attendance;
    pool.getConnection(function(error, connection)
    {
        if(error)
        {
          console.log("database error");
          res.status(503).send({result:"fail"});
          connection.release();
        }
        else
        {

        var firstQuery = "select m.movie_title from movies as m where ? < m.movie_attendance" ;
        connection.query(firstQuery, [attendance], function(err, rows) {

            res.status(200).send({
				stat : "success",
				data : rows,
				msg : "successful loading movies data"
			});
            // connection.end();
            connection.release();  // 반드시 해제해야 합니다.
			console.log("successful loading movies data");
        });
        } // end of else
    }); // end of func [ pool.getConnection ]
}); // end of router.get('/:attendance', (req, res)
   
module.exports = router;
