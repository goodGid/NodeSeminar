const express = require('express');
const router = express.Router();
const createConn = require('./createConn');
const createPool = require('./createPool');


router.use('/createConn', createConn);
router.use('/createPool', createPool);

module.exports = router;
