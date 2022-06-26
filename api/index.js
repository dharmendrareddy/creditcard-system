const express = require('express');
const router = express.Router();

// All new versions to be added here as {/v[0-9]}
router.use('/v1', require('./v1'));

if (process.env.NODE_ENV === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const specs = require('../config/swagger');
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(specs, {
        explorer: true
    }));
}

module.exports = router;