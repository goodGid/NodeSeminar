/*
 Default module
*/
const express = require('express');
const router = express.Router();


// Category
router.use('/category', require('./category/cate'));

// News
router.use('/news', require('./news/news_routes'));

// User
router.use('/user', require('./user/user_routes'));

// Wellbeing
router.use('/wellbeing', require('./training/wellbeing'));

module.exports = router;
