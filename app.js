var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

/***************************************** LOCAL SOCKET STARTS *****************************************/
  // STEP-1 STARTS
    var http=require("http");
    var socketio=require("socket.io");
  // STEP-1 ENDS

  // STEP-2 STARTS
    const server = http.createServer(app);
    app.server = server;
    // Create the Socket IO server on 
    // the top of http server
    const socket = socketio(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
      }
    });
    console.log('socket', socket);
  // STEP-2 ENDS

  // STEP-3 STARTS
  var LocalSocketLib = require('./libs').LocalSocketLib;
  var LocalSocketLibObj = new LocalSocketLib();
  console.log('LocalSocketLibObj',LocalSocketLibObj);

  socket.on( 'connect', LocalSocketLibObj.connection );
  // STEP-3 ENDS
/***************************************** LOCAL SOCKET ENDS *****************************************/






















/***************************************** THIRD PARTY SOCKET STARTS *****************************************/

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

  /**
   * step-2 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
   */
  let ThirdPartySocketLib = require('./libs/ThirdPartySocketLib');
  let ThirdPartySocketLibObj = new ThirdPartySocketLib(ws);
  console.log('ThirdPartySocketLibObj', ThirdPartySocketLibObj);
  /**
   * step-2 : CONNECTING TO THIRD PARTY WEBSOCKET ENDS
   */

  /**
   * step-3 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
   */
  ws.on('open', ThirdPartySocketLibObj.open);
  /**
   * step-3 : CONNECTING TO THIRD PARTY WEBSOCKET STARTS
   */

/***************************************** THIRD PARTY SOCKET ENDS *****************************************/

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
