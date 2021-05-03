var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/**
 * STEP-1 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
 */
let url = 'ws://148.251.21.118:5570';
const WebSocket = require('ws');
const ws = new WebSocket(url);
console.log('ws', ws);
/**
 * STEP-1 : CONNECTING TO THIRD PARTY WEBSOCKET ENDS
 */

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

/**
 * step-2 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
 */
let WebSocketCntrl = require('./libs/ThirdPartySocketLib');
let WebSocketCntrlObj = new WebSocketCntrl(ws);
console.log('WebSocketCntrlObj', WebSocketCntrlObj);
/**
 * step-2 : CONNECTING TO THIRD PARTY WEBSOCKET ENDS
 */

/**
 * step-3 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
 */
ws.on('open', WebSocketCntrlObj.open);
/**
 * step-3 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
