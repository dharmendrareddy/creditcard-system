const express = require('express');
const router = express.Router();

router.use('/cards', require('./creditcards'));
module.exports = router;