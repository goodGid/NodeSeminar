/*
 Default module
*/
const express = require('express');
const router = express.Router();

// S3
router.use('/s3', require('./s3/s3_routes'));

// News
router.use('/news', require('./news/news_routes'));


module.exports = router;
