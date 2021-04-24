var express = require('express');
var router = express.Router();

let usersRouter = require('../users');
let authRouter = require('../authRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
    let result = [];
    res.send({
        status: 200,
        code: 200,
        msg: 'Bets-api working fine',
        data: result
    });
});

router.use( '/auth', authRouter );
router.use( '/users', usersRouter );

module.exports = router;