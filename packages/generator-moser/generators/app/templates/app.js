var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fallbackHistory = require('express-history-api-fallback');
var proxy = require('express-http-proxy');
var api = require('./routes/api');

var app = express();
const APP_DIR = path.join(__dirname, '../dist');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(APP_DIR, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(APP_DIR));

const proxyUrl = process.env.PROXY_URL;

if (proxyUrl) {
  app.use('/api', proxy(proxyUrl, {
    // proxyReqPathResolver: function (RQ) {
    //   return RQ.originalUrl;
    // }
  }));
} else {
  app.use('/api', api);
}

app.use(fallbackHistory('index.html', { root: APP_DIR }));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
