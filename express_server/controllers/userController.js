var User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let AlumniSurvey = require('../models/alumni_survey');
let IbaSurvey = require('../models/iba_survey');
let async = require('async');

const jwt = require('jsonwebtoken');

const signToken = userId => {
    return jwt.sign({
        iss: "highbornsky",
        sub: userId
    }, "cs_web_app_survey", { expiresIn: '1h'});
}

// /users
//--------------------- ADMIN URL CONTROLLERS ----------------------------
exports.index = function (req, res, next) {
    res.status(200).json({ message: { msgBody: "Login to manage Surveys.", msgError: false } });
}

exports.authenticate = function (req, res) {
    // console.log("checked auth");
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: {username} });
    }
};

exports.logout = function(req, res) {
    res.clearCookie('access_token');
    res.json({ user: {username: ""}, success: true });
}

exports.authenticated = function (req, res) {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: {username} });
}

//--------------------- SURVEY URL CONTROLLERS ----------------------------
// get for display
exports.senior_url_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({"type": "url"}, callback);
        },
        number_question: function(callback){
            SeniorSurvey.countDocuments({"type": "url"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
}

// update url details part
exports.senior_url_post = function(req, res) {
    SeniorSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: new Date().getFullYear(),
        type: 'url'
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

// create url
exports.senior_url_create_post = function(req, res){
    function saveSeniorUrl (question) {
        const c = new SeniorSurvey(question)
        return c.save()
      }
    saveSeniorUrl(
        {
        title: 'Computer Science Department is very interested in your opinions. '+
                'We believe that, as a graduating senior, you can provide us with useful '+
                'information to help us evaluate and improve the BS in Computer Science '+
                '(BS in CS) program. We appreciate your taking the time to answer these '+
                'questions.',
        input_type: 'Spring',
        question_type: new Date().getFullYear(),
        type: 'url'
        }
    )
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
}

// delete url
exports.senior_url_delete_post = function(req, res){
    SeniorSurvey.findOneAndDelete({ "type": "url" })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
}

// if url exists, get all the questions
exports.senior_url_check_get = function(req, res){
    if (req.params.id){
        SeniorSurvey.findOne({ "_id": req.params.id }, function(err, result){
            if (err) console.log(err);
            if (!result) {
                res.json({"value": null});
            }
            if (result){
                // take all the questions and pass them back,
                // basically same as senior update get
                async.parallel({
                    question: function(callback){
                        SeniorSurvey.find({"type": "question"}, callback)
                        .sort({_id: -1});
                    },
                    number_question: function(callback){
                        SeniorSurvey.countDocuments({"type": "question"}, callback);
                    },
                    detail: function(callback){
                        SeniorSurvey.findOne({"_id":req.params.id}, {"title": 1, "_id":0}, callback);
                    }
                }, function(err, results){
                    if (err) console.log(err);
                    res.send(results);
                });
            }
        })
    }
}

// alumni
exports.alumni_url_get = function(req, res){
    async.parallel({
        question: function(callback){
            AlumniSurvey.find({"type": "url"}, callback);
        },
        number_question: function(callback){
            AlumniSurvey.countDocuments({"type": "url"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
}

// update url details part
exports.alumni_url_post = function(req, res) {
    AlumniSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: new Date().getFullYear(),
        type: 'url'
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

exports.alumni_url_create_post = function(req, res){
    function saveSeniorUrl (question) {
        const c = new AlumniSurvey(question)
        return c.save()
      }
    saveSeniorUrl(
        {
        title: 'The Computer Science department constantly improve the quality of its \
        services to the students. Your feedback will be used to help to determine how \
        we can best serve students in the future. ',
        input_type: 'Spring',
        question_type: new Date().getFullYear(),
        type: 'url'
        }
    )
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
}

exports.alumni_url_delete_post = function(req, res){
    AlumniSurvey.findOneAndDelete({ "type": "url" })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
}

// iba
exports.iba_url_get = function(req, res){
    async.parallel({
        question: function(callback){
            IbaSurvey.find({"type": "url"}, callback);
        },
        number_question: function(callback){
            IbaSurvey.countDocuments({"type": "url"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
}


// update url details part
exports.iba_url_post = function(req, res) {
    IbaSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: new Date().getFullYear(),
        type: 'url'
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

exports.iba_url_create_post = function(req, res){
    function saveSeniorUrl (question) {
        const c = new IbaSurvey(question)
        return c.save()
      }
    saveSeniorUrl(
        {
            title: 'The Computer Science department constantly improve the quality of its \
            services to the students. Your feedback will be used to help to determine how \
            we can best serve students in the future. ',
            input_type: 'Spring',
            question_type: new Date().getFullYear(),
            type: 'url'
            }
    )
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
}

exports.iba_url_delete_post = function(req, res){
    IbaSurvey.findOneAndDelete({ "type": "url" })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
}

//--------------------- SENIOR SURVEY CONTROLLERS ----------------------------
// users/senior

exports.senior_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({"type": "question"}, {"title":1, "_id":0}, callback);
        },
        number_question: function(callback){
            SeniorSurvey.countDocuments({"type": "question"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

// exports.senior_detail_get = function(req, res){
//     res.send("Senior Survey Detail get: " + req.params.id);
// };

// exports.senior_create_get = function(req, res){
//     res.send("Senior Survey Create Get");
// };

exports.senior_create_post = function(req, res){
    function saveSeniorQuestion (question) {
        const c = new SeniorSurvey(question)
        return c.save()
      }
    saveSeniorQuestion({
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
};

// edit survey questions, display
exports.senior_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({"type": "question"}, callback)
            .sort({_id: -1});
        },
        number_question: function(callback){
            SeniorSurvey.countDocuments({"type": "question"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
};

// edit survey, post
exports.senior_update_post = function(req, res) {
    SeniorSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

exports.senior_delete_get = function(req, res) {
    res.send("Delete senior get");
};

exports.senior_delete_post = function(req, res) {
    SeniorSurvey.findOneAndDelete({ "_id": req.body.id })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
};

//--------------------- ALUMNI SURVEY CONTROLLER----------------------------
// users/alumni

exports.alumni_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            AlumniSurvey.find({"type": "question"}, {"title":1, "_id":0}, callback);
        },
        number_question: function(callback){
            AlumniSurvey.countDocuments({"type": "question"}, callback);
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
    function saveAlumniQuestion (question) {
        const c = new AlumniSurvey(question)
        return c.save()
      }

    saveAlumniQuestion({
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
};

exports.alumni_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            AlumniSurvey.find({"type": "question"}, callback)
            .sort({_id: -1});
        },
        number_question: function(callback){
            AlumniSurvey.countDocuments({}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
};

exports.alumni_update_post = function(req, res) {
    AlumniSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

exports.alumni_delete_get = function(req, res) {
    res.send("alumni Survey Delete get");
};

exports.alumni_delete_post = function(req, res) {
    AlumniSurvey.findOneAndDelete({ "_id": req.body.id })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
};

//--------------------- IBA SURVEY ----------------------------
// users/iba/

exports.iba_survey_get = function(req, res){
    async.parallel({
        question: function(callback){
            IbaSurvey.find({"type": "question"}, {"title":1, "_id":0}, callback);
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
    function saveIbaQuestion (question) {
        const c = new IbaSurvey(question)
        return c.save()
      }

    saveIbaQuestion({
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(doc => { 
            // console.log(doc)
            res.json(doc)
        })
        .catch(err => { console.error(err)})
};

exports.iba_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            IbaSurvey.find({"type": "question"}, callback)
            .sort({_id: -1});
        },
        number_question: function(callback){
            IbaSurvey.countDocuments({}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
};

exports.iba_update_post = function(req, res) {
    IbaSurvey.findOneAndUpdate({"_id": req.body.id }, {
        title: req.body.title,
        input_type: req.body.input_type,
        question_type: req.body.question_type
    })
        .then(updated => {
            // console.log(updated)
            res.send(updated)
        })
        .catch(err => console.log(err));
};

exports.iba_delete_get = function(req, res) {
    res.send("iba Survey Delete get");
};

exports.iba_delete_post = function(req, res) {
    IbaSurvey.findOneAndDelete({ "_id": req.body.id })
    .then(deleted => {
        // console.log(deleted)
        res.json(deleted)
    })
    .catch(err => console.log(err));
};