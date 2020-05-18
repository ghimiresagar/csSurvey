let User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let async = require('async');

let db = require('../connection');
let UserCollection = db.collection("User");
let SeniorSurveyCollection = db.collection("SeniorSurvey");
let AlumniSurveyCollection = db.collection("AlumniSurvey");


// /users
exports.index = function (req, res, next) {
    res.send("Login to manage surveys.");
}

exports.authenticate = function (req, res, next) {
    res.send("User authentication, NI, post");
};

// /users/surveys
exports.list_surveys = function(req, res){
    async.parallel({
        user_count: function(callback){
            UserCollection.countDocuments({}, callback);
        },
        // user_name: function(callback) {
        //     UserCollection.findOne({}, callback);
        // },
        senior_survey_count: function(callback){
            SeniorSurveyCollection.countDocuments({}, callback);
        },
        alumni_survey_count: function(callback){
            AlumniSurveyCollection.countDocuments({}, callback);
        }
    }, function(err, results){
        if (err) { 
            res.send(err); 
        } else {
            res.send(results);   
        }
    });
};

// /users/results
exports.list_survey_results = function(req, res, next) {
    res.send("list recent survey results, NI, get");
}