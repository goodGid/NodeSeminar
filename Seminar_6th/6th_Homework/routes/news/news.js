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

router.get('/getOrderby', function(req, res){
    
        let taskArray = [
            function (callback) {
                pool.getConnection((err, connection) => {
                    if(err) callback(err,null);
                    else callback(null,connection);
                });   
            },
            function (conn, callback) {
                var ascQuery = 
                `
                select * from news_table as n order by n.time asc;
                `;
    
                var descQuery = 
                `
                select * from news_table as n order by n.time desc;
                `;
    
                conn.query(descQuery, function (err, data) {
                    if (err) callback(err, null);
                    else {   
                        res.status(200).send({
                            msg : "Good Gid !",
                            data : data
                        });
                        conn.release();
                        callback(null,"OrderBy Success");
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
    

/*
 Method : Post
*/

router.post('/', upload.array('image',2), function(req, res){
    var n_title = req.body.n_title;
    var n_maker = req.body.n_maker;
    var n_ssumnailImg_UrlFromS3 = req.files[0].location;
    var n_content = req.body.n_content;
    var n_contentImg_UrlFromS3 = req.files[1].location;
    
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
            insert into news_table (title, maker, ssumnail_url, content, content_url)
            values(?,?,?,?,?)

            `;
            conn.query(firstQuery, [n_title, n_maker, n_ssumnailImg_UrlFromS3, n_content, n_contentImg_UrlFromS3], function (err, data) {
                if (err) callback(err, null);
                else {   
                    res.status(200).send({
                        msg : "Good Gid !"
                    });
                    conn.release();
                    callback(null,"News Store Success");
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
