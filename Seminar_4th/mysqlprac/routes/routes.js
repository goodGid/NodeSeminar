/*
 default module
*/
const express = require('express');
const router = express.Router();

// Classify
const classify = require('./training/classify');
router.use('/classify', classify);

// Classify
const createConn = require('./createConn');
router.use('/createConn', createConn);

module.exports = router;
