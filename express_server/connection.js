let mongoose = require('mongoose');

var mg_url = 'mongodb+srv://sagardb:Somerville11@cluster0-z8jim.mongodb.net/csSurvey?retryWrites=true&w=majority';
mongoose.connect(mg_url, { useNewUrlParser: true }, function(err) {
  if (!err) {
    console.log("[Info] Connected to db");
  }
  return console.log("Error: (no error - null)"+err);
});

//Get the default connection, database
var db = mongoose.connection;

module.exports = db;