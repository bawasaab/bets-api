var express = require('express');
var router = express.Router();

var frontendRouter = require('./frontend/frontendRouter');
var backendRouter = require('./backend/backendRouter');
var apiRouter = require('./api/apiRouter');

/**
 * the main root / is a frontend
 * the /admin is backend panel
 * the /api is api of the project
 */

router.use('/', frontendRouter);
router.use('/admin', backendRouter );
router.use('/api', apiRouter );

module.exports = router;
