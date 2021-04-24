var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let result = [];
    res.send({
        status: 200,
        code: 200,
        msg: 'Records found',
        data: result
    });
});

module.exports = router;