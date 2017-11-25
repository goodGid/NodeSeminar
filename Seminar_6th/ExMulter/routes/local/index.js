const express = require('express');
const router = express.Router();
const single = require('./single');

router.use('/single', single);

module.exports = router;
