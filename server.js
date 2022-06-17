'use strict';
require('dotenv').config();
const express = require('express');
var bodyParser       = require('body-parser');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

//WP|Forever API application setup
app.use(function(req, res, next) {

  res.on('error',function(err){
      console.error('[RES] Something went wrong with the connection to interface', err);
  });

  req.on('error',function(err){
      console.error('[REQ] Something went wrong with the connection to interface', err);
  });

  app.mysql = function() {
      return mariaDB;
  };
  app.cassandra = function() {
      return cassandra;
  };
  res.sendJSON = function(data) {
      //console.log('HIT');
      res.json(data);
      res.end();
  };
  // req.access_token = function() {
  //     if(typeof req.query.access_token !== 'undefined'
  //         && req.query.access_token) {
  //         return req.query.access_token;
  //     }
  //     if (typeof req.cookies.access_token !== 'undefined'
  //         && req.cookies.access_token) {
  //         return req.cookies.access_token;
  //     }
  //     if (req.headers['access-token']) {
  //         return req.headers['access-token'];
  //     }
  //     if(typeof req.body.access_token !== 'undefined'
  //         && req.body.access_token) {
  //         return req.body.access_token;
  //     }
  //     return false;
  // };
  //req.app.set('env', 'development');
  res.header("X-powered-by", "Convesio");
  next()
});

//Standard Middleware required by our application
// app.use(cors());
// app.use(logger(config.logger));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Welcome to Gitea Api');
});

app.use('/auth', require('./routes/auth'));
app.use('/repo', require('./routes/repo'));
app.use('/branch', require('./routes/branch'));
app.use('/file', require('./routes/file'));
app.use('/pulls', require('./routes/pulls'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.sendJSON({
      error: err.message
  });
});





app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


module.exports = app;