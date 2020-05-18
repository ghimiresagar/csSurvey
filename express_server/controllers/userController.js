let User = require('../models/user');
let SeniorSurvey = require('../models/senior_survey');
let AlumniSurvey = require('../models/alumni_survey');
let async = require('async');

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
            User.countDocuments({}, callback);
        },
        senior_survey_count: function(callback){
            SeniorSurvey.countDocuments({}, callback);
        },
        alumni_survey_count: function(callback){
            AlumniSurvey.countDocuments({}, callback);
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