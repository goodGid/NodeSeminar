/*
 Default module
*/
const express = require('express');
const router = express.Router();


// News
router.use('/', require('./news'));

module.exports = router;
