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


//--------------------- SENIOR SURVEY CONTROLLERS ----------------------------
// users/senior

// exports.senior_list_get = function(req, res){
//     res.send("Senior Survey List get");
// };

exports.senior_detail_get = function(req, res){
    res.send("Senior Survey Detail get: " + req.params.id);
};

exports.senior_create_get = function(req, res){
    res.send("Senior Survey Create Get");
};

exports.senior_create_post = function(req, res){
    res.send("Senior Survey Create Post");
};

exports.senior_update_get = function(req, res){
    res.send("Senior Survey Update get");
};

exports.senior_update_post = function(req, res) {
    res.send("Senior Survey Update post");
};

exports.senior_delete_get = function(req, res) {
    res.send("Senior Survey Delete get");
};

exports.senior_delete_post = function(req, res) {
    res.send("Senior Survey Delete post");
};

//--------------------- ALUMNI SURVEY CONTROLLER----------------------------
// users/alumni

exports.alumni_detail_get = function(req, res){
    res.send("alumni Survey Detail get" + req.params.id);
};

exports.alumni_create_get = function(req, res){
    res.send("alumni Survey Create Get");
};

exports.alumni_create_post = function(req, res){
    res.send("alumni Survey Create Post");
};

exports.alumni_update_get = function(req, res){
    res.send("alumni Survey Update get");
};

exports.alumni_update_post = function(req, res) {
    res.send("alumni Survey Update post");
};

exports.alumni_delete_get = function(req, res) {
    res.send("alumni Survey Delete get");
};

exports.alumni_delete_post = function(req, res) {
    res.send("alumni Survey Delete post");
};

//--------------------- IBA SURVEY ----------------------------
// users/iba/

exports.iba_detail_get = function(req, res){
    res.send("iba Survey Detail get" + req.params.id);
};

exports.iba_create_get = function(req, res){
    res.send("iba Survey Create Get");
};

exports.iba_create_post = function(req, res){
    res.send("iba Survey Create Post");
};

exports.iba_update_get = function(req, res){
    res.send("iba Survey Update get");
};

exports.iba_update_post = function(req, res) {
    res.send("iba Survey Update post");
};

exports.iba_delete_get = function(req, res) {
    res.send("iba Survey Delete get");
};

exports.iba_delete_post = function(req, res) {
    res.send("iba Survey Delete post");
};