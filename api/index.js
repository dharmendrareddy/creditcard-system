const express = require('express');
const router = express.Router();

// All new versions to be added here as {/v[0-9]}
router.use('/v1', require('./v1'));

module.exports = router;