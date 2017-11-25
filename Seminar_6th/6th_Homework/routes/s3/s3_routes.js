/*
 Default module
*/
const express = require('express');
const router = express.Router();


// S3
router.use('/', require('./s3'));

module.exports = router;
