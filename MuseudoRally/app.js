var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var home = require('./routes/home')
var prova = require('./routes/prova')
var participante = require('./routes/participante')
var paises = require('./routes/pais')
var piloto = require('./routes/piloto')
var marca = require('./routes/marca')
var equipa = require('./routes/equipa')
var carro = require('./routes/carro')
var podium = require('./routes/podium')
var admin = require('./routes/admin')
var news = require('./routes/news')
var pesquisa = require('./routes/pesquisa')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index',index)
app.use('/home', home)
app.use('/prova',prova)
app.use('/GParticipantes',participante)
app.use('/paises',paises)
app.use('/piloto',piloto)
app.use('/marcas',marca)
app.use('/equipas',equipa)
app.use('/carro',carro)
app.use('/podium',podium)
app.use('/admin',admin)
app.use('/news',news)
app.use('/pesquisa',pesquisa)


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
