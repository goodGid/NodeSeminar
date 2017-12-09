/*
 Default module
*/
const express = require('express');
const router = express.Router();

// User
router.use('/user', require('./user/user_routes'));

// Test
router.use('/test', require('./test'));

module.exports = router;
