/**
  OptSystem Lexical Analyzer
  @author Devpy & 365Bytes Team
  @version 0.0.1 [Beta]
**/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var appConfig = require('./config');

// --> Controllers Routes 
var lex = require('./routes/lex');
var lexer = require('./routes/lexer');

// --> Start Express Instance
var app = express();

// --> Views Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// --> Start Routes[][]
//app.use('/', routes);
app.use('/', lex);
app.use('/lexer', lexer);

// --> Init error Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, function () {
  console.log(appConfig.title+ ' started at port:: 3000');
});


// --> Mode: Development
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// --> Mode: Production [Not show errors]
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;