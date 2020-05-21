var User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let AlumniSurvey = require('../models/alumni_survey');
let IbaSurvey = require('../models/iba_survey');
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
    res.send("List Surveys");
};


//--------------------- SENIOR SURVEY CONTROLLERS ----------------------------
// users/senior

exports.senior_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({}, {"title":1, "_id":0}, callback);
        },
        number_question: function(callback){
            SeniorSurvey.countDocuments({}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
};

exports.senior_detail_get = function(req, res){
    res.send("Senior Survey Detail get: " + req.params.id);
};

exports.senior_create_get = function(req, res){
    res.send("Senior Survey Create Get");
};

function saveSeniorQuestion (question) {
    const c = new SeniorSurvey(question)
    return c.save()
  }

exports.senior_create_post = function(req, res){
    saveSeniorQuestion({
        _id: res.body.id,
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type,
        // result:[        // result is always default when created
        //     {
        //         semester: "Spring",
        //         year: 2019,
        //         number_of_parts: 0,
        //         rate: [0,0,0,0,0]
        //     }
        // ]
    })
        .then(doc => { console.log(doc)})
        .catch(err => { console.error(err)})
};

// edit survey questions
exports.senior_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({}, callback)
            .sort({_id: -1});
        },
        number_question: function(callback){
            SeniorSurvey.countDocuments({}, callback);
        },
        top_id: function(callback){         // returns an array
            SeniorSurvey.find({}, {"_id":1}, callback).sort({"_id": -1}).limit(1);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
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

exports.alumni_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            AlumniSurvey.find({}, {"title":1, "_id":0}, callback);
        },
        number_question: function(callback){
            AlumniSurvey.countDocuments({}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);

    });
};

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

exports.iba_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            IbaSurvey.find({}, {"title":1, "_id":0}, callback);
        },
        number_question: function(callback){
            IbaSurvey.countDocuments({}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);

    });
};

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