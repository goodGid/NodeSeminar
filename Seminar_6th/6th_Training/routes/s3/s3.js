/*
 Default module
*/
const express = require('express');
const router = express.Router();
const async = require('async');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws_config.json');
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'goodgid-s3',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});

/*
 Custom module
*/

const pool = require('../../config/dbPool');

/*
 Router.use
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/*
 Method : Get
*/


/*
 Method : Post
*/




/*
Upload의 Method

array : 배열 형식
field : 배열을 여러개
any : Combine [ single array field ]
*/


router.post('/single', upload.single('image'), function(req, res){
    let imgIdx = req.body.imgIdx;
    let imgUrlFromS3 = req.file.location; // single이기 때문에 req.files[i]가 아니라 req.file이다.

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
            insert into init_s3 (imgUrl)
            values(?)
            `;
            
            conn.query(firstQuery, [imgUrlFromS3], function(err, rows) {
                if(err) {
                    callback(err);
                    conn.release();
                }
                else {   
                    res.status(200).send({
                        stat : "S3 success",
                    });
                    conn.release();  // 반드시 해제해야 합니다.
                    callback(null, " S3 Successful ");
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



router.post('/array', upload.array('image',1), function(req, res){
    let imgIdx = req.body.imgIdx;
    let imgUrlFromS3_1 = req.files[0].location; // req.file이 아니라 req.files[i]이다. 

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
            insert into init_s3 
            values(?,?)
            `;
            
            conn.query(firstQuery, [imgIdx,imgUrlFromS3_1], function(err, rows) {
                if(err) {
                    callback(err);
                    conn.release();
                }
                else {   
                    res.status(200).send({
                        stat : "S3 success",
                    });
                    conn.release();  // 반드시 해제해야 합니다.
                    callback(null, " S3 Successful ");
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
