var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// const hostname = "cs_survey.salemstate.edu"
const hostname = "http://127.0.0.1"
const port = 5000;

//Set up mongoose connection
var mongoose = require('mongoose').set('debug', true);
var mongoDB = 'mongodb+srv://sagardb:Somerville11@cluster0-z8jim.mongodb.net/cs_survey?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.once('open', _ => {
  console.log('[INFO] Database connected!')
});

db.on('error', err => {
  console.error('[WARNING] connection error!')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cross origin resourse sharing
// app.use(cors({ origin: 'http://cs_survey.salemstate.edu' }));
app.use(cors({ origin: 'http://127.0.0.1' }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

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
