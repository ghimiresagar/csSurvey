var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');

// integrate routing
var indexRouter = require('./routes/index');

var app = express();

const port = 5000;

//Set up mongoose connection
var mongoose = require('mongoose').set('debug', true);

// database name
var mongoDB = 'mongodb+srv://sagardb:Somerville11@cluster0-z8jim.mongodb.net/cs_survey?retryWrites=true&w=majority';
// var mongoDB = "mongodb://127.0.0.1:27017/cs_survey"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// check if connection has succeeded
var db = mongoose.connection;
db.once('open', _ => {
  console.log('[INFO] Database connected!')
});

db.on('error', err => {
  console.error('[WARNING] connection error!')
});

// cross origin resourse sharing
// for publishing
// app.use(cors({ origin: 'http://cs_survey.salemstate.edu' }));

// for using locally
app.use(cors({ origin: 'http://127.0.0.1' }));

// to let express accept json request and accept cookies setup
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

module.exports = app;