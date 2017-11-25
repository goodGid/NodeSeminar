const express = require('express');
const router = express.Router();
const local = require('./local/index');
const s3 = require('./s3/index');

router.use('/local', local);
router.use('/s3', s3);

module.exports = router;
