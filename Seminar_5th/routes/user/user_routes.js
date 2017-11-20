/*
 Default module
*/
const express = require('express');
const router = express.Router();


// Signin
router.use('/signin', require('./signin'));

// Signup
router.use('/signup', require('./signup'));

module.exports = router;
