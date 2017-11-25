const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws_config.json');
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'uniquename1234',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});

router.post('/',upload.array('image',2), function(req, res){
  res.status(201).send({
    msg : "successful save image file!",
    data : [req.files[0].location, req.files[1].location]
  });
});

module.exports = router;
