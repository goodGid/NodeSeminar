/*
 Default module
*/
const express = require('express');
const router = express.Router();


// Detail News Content
router.use('/detailNews', require('./news'));

module.exports = router;
