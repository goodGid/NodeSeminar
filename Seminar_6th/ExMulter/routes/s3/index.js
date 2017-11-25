const express = require('express');
const router = express.Router();
const array = require('./array');

router.use('/array', array);


module.exports = router;
