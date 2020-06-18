var User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let AlumniSurvey = require('../models/alumni_survey');
let IabSurvey = require('../models/iab_survey');
let IpAddress = require('../models/ip_addresses');
let ArchiveResult = require('../models/archive_results');
let async = require('async');

const jwt = require('jsonwebtoken');

const signToken = userId => {
    return jwt.sign({
        iss: "highbornsky",
        sub: userId
    }, "cs_web_app_survey", { expiresIn: '1h'});
}

const getIp = (req) => {
    return req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

const checkIp = (req, name) => {
    return IpAddress.countDocuments({ ip: getIp(req), name: name });
}

const checkResult = (body) => {
    return ArchiveResult.countDocuments({ /*semester: body.semester,*/ year: body.year, name: body.name });
}

// results
exports.get_senior_result = function (req, res) {
    console.log(req.body);
    const survey = {
        name: req.body.type,
        year: req.body.year,
        // semester: req.body.semester
    }
    ArchiveResult.findOne({ name: survey.name, year: survey.year/*, semester: survey.semester*/ })
        .then(result => {
            res.json({ "result": result });
            // console.log(result);
            // res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.json({ "result": err });
        });
}

// /users
//--------------------- ADMIN URL CONTROLLERS ----------------------------
exports.index = function (req, res, next) {
    // res.sendFile(path.join(__dirname, '../build/index.html'));
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

// Incrementing question order

exports.increment_question = function(req, res) {
    if ( req.body.surveyType === "IAB" ) {
        IabSurvey.updateOne({ question_type : req.body.numUp }, {
            $inc: { question_type: 1 }
        })
        .then(data => {
            IabSurvey.updateOne({ "_id": req.body.id }, {
                $inc: { question_type: -1 }
            })
            .then(data2 => {
                if (!data2) res.send(null);
                res.json({ "value": true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
}

exports.decrement_question = function(req, res) {
    if ( req.body.surveyType === "IAB" ) {
        IabSurvey.updateOne({ question_type : req.body.numDown }, {
            $inc: { question_type: -1 }
        })
        .then(data => {
            IabSurvey.updateOne({ "_id": req.body.id }, {
                $inc: { question_type: 1 }
            })
            .then(data2 => {
                if (!data2) res.send(null);
                res.json({ "value": true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
}
//--------------------- SURVEY URL CONTROLLERS ----------------------------
// get for display
exports.senior_url_get = function(req, res){
    async.parallel({
        details: function(callback){
            SeniorSurvey.findOne({"type": "detail"}, callback);
        },
        number_url: function(callback){
            SeniorSurvey.countDocuments({"type": "url"}, callback);
        },
        number_detail: function(callback) {
            SeniorSurvey.countDocuments({"type": "detail"}, callback);
        },
        urlId: function(callback){
            SeniorSurvey.findOne({"type": "url"}, {"_id": 1}, callback);
        },
    }, function(err, result){
        if (err) console.log(err);
        if (!result) res.send(null);
        res.send(result);
    });
}

// update url details part
exports.senior_url_post = function(req, res) {
    SeniorSurvey.findOneAndUpdate({ "type": "detail" }, {
        title: req.body.title,
        type: 'detail',
        result: {
            semester: req.body.semester,
            year: req.body.year,
            name: 'Senior'
        }
    })
    .then(updated => {
        res.send(updated)
    })
    .catch(err => console.log(err));
};

// create url
exports.senior_url_create_post = function(req, res){
    const urlDetails = {
        title: 'Computer Science Department is very interested in your opinions. '+
        'We believe that, as a graduating senior, you can provide us with useful '+
        'information to help us evaluate and improve the BS in Computer Science '+
        '(BS in CS) program. We appreciate your taking the time to answer these '+
        'questions.',
        type: 'detail',
        result: {
            semester: 'Spring',
            year: new Date().getFullYear(),
            name: 'Senior'
        }
    };
    const url = {
        title: 'url',
        type: 'url'
    };

    SeniorSurvey.countDocuments({ type: 'detail' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlDetailSave = new SeniorSurvey(urlDetails);
            urlDetailSave.save();
        }
    }).catch(err => console.log(err));
    SeniorSurvey.countDocuments({ type: 'url' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlSave = new SeniorSurvey(url);
            urlSave.save();
        }
    }).catch(err => console.log(err));

    res.json({ "status": "Saved" });
}

exports.senior_url_delete_post = function(req, res) {
    if (req.params.id) {
        SeniorSurvey.findOneAndDelete({ "type": "url" })
        .then(data => {
            res.json({message: { msgBody: "Deleting Survey Link.", msgError: true }});           
        })
        .catch(err => console.log(err));
    }
}

// archive url
// while deleting take all the results and put it into archive table
exports.senior_url_archive_post = function(req, res){
    // check if we have valid id being passed as type url is only one
    if (req.params.id) {        // see if we have id present
        const body = {
            semester: "",
            year: "",
            name: "",
            numberOfParts: 0,
            result: []
        };
        // get things in parallel
        async.parallel({
            detail: function(callback) {
                SeniorSurvey.findOne({ $and: [{"_id" : req.params.id}, {"type": "detail"} ] },  
                callback);
            },
            question: function(callback) {
                SeniorSurvey.find({ "type": "question" }, 
                 callback);
            }
        }, function (err, result) {     // when we get our url and questions
            if (err) console.log(err);
            if (!result)
                res.json({message: { msgBody: "Error", msgError: true }});
            if (result.detail) {
                // body.semester = result.detail.result.semester;
                body.year = result.detail.result.year;
                body.name = result.detail.result.name;
                body.numberOfParts = result.detail.result.numberOfParts;
            }
            if (result.question) {
                (result.question).forEach(element => {
                    body.result.push({
                        q_title: element.title,
                        q_type: element.input_type,
                        rate: element.result.rate,
                        comment: element.result.comment
                    });
                });
            }
            // now we have an object "body" with all the necessary values
            // put it into Archive Collection
            checkResult(body).then(doc => {     // check if this date's survey is already present
                if (doc === 0) {                // if new add     
                    const doc = new ArchiveResult(body);
                    doc.save();

                    async.parallel({
                        deleteIp: function(callback){
                            IpAddress.remove({ "name": body.name }, callback);
                        },
                        deleteUrl: function(callback){
                            SeniorSurvey.findOneAndDelete({ "type": "url" }, callback);
                        },
                        deleteDetail: function(callback){
                            SeniorSurvey.findOneAndDelete({ "type": "detail" }, callback);
                        },
                        deleteQuestionResults: function(callback){
                            SeniorSurvey.update({ "type": "question" }, {
                                $unset: { "result": {} } 
                            }, { multi: true } , callback);
                        }, function (err, result){
                            if (err) console.log(err);
                            res.json({message: { msgBody: "Saving Result!", msgError: false }});
                        }
                    });
                } else {                        // if old update
                    res.json({message: { msgBody: "The results are already available for this term. Please check if it's the current semester and year.", msgError: true }});           
                }                       
            }).catch(
                err => {
                    res.json({message: { msgBody: "Something went wrong!", msgError: true }});           
                }
            )
        });
    }
}

// if url exists, get all the questions for survey layout
exports.senior_url_check_get = function(req, res){
    if (req.params.id){     // if url id is present in the link, check this
        // check if the ip address passed is not present on the list
        checkIp(req, 'Senior').then(doc => {
            if (doc === 0) {    // ip is not found
                SeniorSurvey.findOne({ "_id" : req.params.id, "type": "url" }, function(err, result){
                    if (err) console.log(err);
                    if (!result) {
                        res.json({"value": null});
                    }
                    if (result){            // if url is present
                        // take all the questions and pass them back,
                        // basically same as iab update get
                        async.parallel({
                            question: function(callback){
                                SeniorSurvey.find({"type": "question"}, callback)
                                .sort({question_type: 1})
                                .sort({input_type: -1});
                            },
                            number_question: function(callback){
                                SeniorSurvey.countDocuments({"type": "question"}, callback);
                            },
                            detail: function(callback){
                                SeniorSurvey.findOne({"type":"detail"}, {"title": 1, "_id":0}, callback);
                            }
                        }, function(err, results){
                            if (err) console.log(err);
                            res.send(results);
                        });
                    }
                });
            } else {
                res.json({ 
                    "value": "taken"
                });
            }
        });
        
        
    }
}

// post the result to the respective question
exports.senior_url_check_post = function(req, res){
    checkIp(req, 'Senior')
    .then(doc => {
        if (doc === 0) {    // nothing found
            (req.body).forEach(element => {
                if (element === null) {
                    console.log(); // empty log for null
                } else if (element.input_val === "Rate"){
                    let x = "result.rate.";
                    SeniorSurvey.updateOne({"_id": element.id}, 
                            { $inc: { [x + element.value ] : 1} })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                } else {
                    let x = "result.comment";
                    SeniorSurvey.updateOne({"_id": element.id}, 
                            { $push: { [x] : element.value } })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                }
            });
            // after all the request is done, the code comes here
            const address = new IpAddress({
                url: req.params.id,
                ip: getIp(req),
                name: 'Senior'
            });
            address.save()
            .catch(err => console.log(err));
            
            // update number of survey takers
            SeniorSurvey.updateOne({"type": "detail"}, { $inc: {"result.numberOfParts": 1} })
            .catch(err => console.log(err));
            res.json({ message: {msgBody: "Success. You will be soon redirected.", msgError: false} });
        } else {
            // console.log("You already took the survey.");
            res.json({message: {msgBody: "Error already took the survey.", msgError: true} });
        }
    });
}

// alumni
exports.alumni_url_get = function(req, res){
    async.parallel({
        details: function(callback){
            AlumniSurvey.findOne({"type": "detail"}, callback);
        },
        number_url: function(callback){
            AlumniSurvey.countDocuments({"type": "url"}, callback);
        },
        number_detail: function(callback) {
            AlumniSurvey.countDocuments({"type": "detail"}, callback);
        },
        urlId: function(callback){
            AlumniSurvey.findOne({"type": "url"}, {"_id": 1}, callback);
        },
    }, function(err, result){
        if (err) console.log(err);
        if (!result) res.send(null);
        res.send(result);
    });
}

// update url details part
exports.alumni_url_post = function(req, res) {
    AlumniSurvey.findOneAndUpdate({ "type": "detail" }, {
        title: req.body.title,
        type: 'detail',
        result: {
            semester: req.body.semester,
            year: req.body.year,
            name: 'Alumni'
        }
    })
    .then(updated => {
        res.send(updated)
    })
    .catch(err => console.log(err));
};

exports.alumni_url_create_post = function(req, res){
    const urlDetails = {
        title: 'The Computer Science department constantly improve the quality of its services to the students. Your feedback will be used to help to determine how we can best serve students in the future.',
        type: 'detail',
        result: {
            semester: 'Spring',
            year: new Date().getFullYear(),
            name: 'Alumni'
        }
    };
    const url = {
        title: 'url',
        type: 'url'
    };

    AlumniSurvey.countDocuments({ type: 'detail' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlDetailSave = new AlumniSurvey(urlDetails);
            urlDetailSave.save();
        }
    }).catch(err => console.log(err));
    AlumniSurvey.countDocuments({ type: 'url' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlSave = new AlumniSurvey(url);
            urlSave.save();
        }
    }).catch(err => console.log(err));

    res.json({ "status": "Saved" });
}

// delete url
exports.alumni_url_delete_post = function(req, res){
    if (req.params.id) {
        AlumniSurvey.findOneAndDelete({ "type": "url" })
        .then(data => {
            res.json({message: { msgBody: "Deleting Survey Link.", msgError: true }});           
        })
        .catch(err => console.log(err));
    }
}


// archive url
// while deleting take all the results and put it into archive table
exports.alumni_url_archive_post = function(req, res){
    // check if we have valid id being passed as type url is only one
    if (req.params.id) {        // see if we have id present
        const body = {
            semester: "",
            year: "",
            name: "",
            numberOfParts: 0,
            result: []
        };
        // get things in parallel
        async.parallel({
            detail: function(callback) {
                SeniorSurvey.findOne({ $and: [{"_id" : req.params.id}, {"type": "detail"} ] },  
                callback);
            },
            question: function(callback) {
                AlumniSurvey.find({ "type": "question" }, 
                 callback);
            }
        }, function (err, result) {     // when we get our url and questions
            if (err) console.log(err);
            if (!result)
                res.json({message: { msgBody: "Error", msgError: true }});
            if (result.detail) {
                body.semester = result.detail.result.semester;
                body.year = result.detail.result.year;
                body.name = result.detail.result.name;
                body.numberOfParts = result.detail.result.numberOfParts;
            }
            if (result.question) {
                (result.question).forEach(element => {
                    body.result.push({
                        q_title: element.title,
                        q_type: element.input_type,
                        rate: element.result.rate,
                        comment: element.result.comment
                    });
                });
            }
            // now we have an object "body" with all the necessary values
            // put it into Archive Collection
            checkResult(body).then(doc => {     // check if this date's survey is already present
                if (doc === 0) {                // if new add     
                    const doc = new ArchiveResult(body);
                    doc.save();

                    async.parallel({
                        deleteIp: function(callback){
                            IpAddress.remove({ "name": body.name }, callback);
                        },
                        deleteUrl: function(callback){
                            AlumniSurvey.findOneAndDelete({ "type": "url" }, callback);
                        },
                        deleteDetail: function(callback){
                            AlumniSurvey.findOneAndDelete({ "type": "detail" }, callback);
                        },
                        deleteQuestionResults: function(callback){
                            AlumniSurvey.update({ "type": "question" }, {
                                $unset: { "result": {} } 
                            }, { multi: true } , callback);
                        }, function (err, result){
                            if (err) console.log(err);
                            res.json({message: { msgBody: "Saving Result!", msgError: false }});
                        }
                    });
                } else {                        // if old update
                    res.json({message: { msgBody: "The results are already available for this term. Please check if it's the current semester and year.", msgError: true }});           

                    // async.parallel({
                    //     deleteIp: function(callback){
                    //         IpAddress.remove({ "url": req.params.id }, callback);
                    //     },
                    //     deleteUrl: function(callback){
                    //         AlumniSurvey.findOneAndDelete({ "type": "url" }, callback);
                    //     },
                    //     deleteQuestionResults: function(callback){
                    //         AlumniSurvey.update({ "type": "question" }, {
                    //             $unset: { "result": {} } 
                    //         }, { multi: true } , callback);
                    //     }, function (err, result){
                    //         if (err) console.log(err);
                    //         res.json({message: { msgBody: "The results are already available. Can't update them anymore.", msgError: true }});           
                    //     }
                    // });
                }                       
                }).catch(
                    err => {
                        res.json({message: { msgBody: "Something went wrong!", msgError: true }});           
                    }
            )
        });
    }
}

// if url exists, get all the questions
exports.alumni_url_check_get = function(req, res){
    if (req.params.id){     // if url id is present in the link, check this
        // check if the ip address passed is not present on the list
        checkIp(req, 'Alumni').then(doc => {
            if (doc === 0) {    // ip is not found
                AlumniSurvey.findOne({ "_id" : req.params.id, "type": "url" }, function(err, result){
                    if (err) console.log(err);
                    if (!result) {
                        res.json({"value": null});
                    }
                    if (result){            // if url is present
                        // take all the questions and pass them back,
                        // basically same as iab update get
                        async.parallel({
                            question: function(callback){
                                AlumniSurvey.find({"type": "question"}, callback)
                                .sort({question_type: 1})
                                .sort({input_type: -1});
                            },
                            number_question: function(callback){
                                AlumniSurvey.countDocuments({"type": "question"}, callback);
                            },
                            detail: function(callback){
                                AlumniSurvey.findOne({"type":"detail"}, {"title": 1, "_id":0}, callback);
                            }
                        }, function(err, results){
                            if (err) console.log(err);
                            res.send(results);
                        });
                    }
                });
            } else {
                res.json({ 
                    "value": "taken"
                });
            }
        });
        
        
    }
}

// post the result to the respective question
exports.alumni_url_check_post = function(req, res){
    checkIp(req, 'Alumni')
    .then(doc => {
        if (doc === 0) {    // nothing found
            (req.body).forEach(element => {
                if (element === null) {
                    console.log(); // empty log for null
                } else if (element.input_val === "Rate"){
                    let x = "result.rate.";
                    AlumniSurvey.updateOne({"_id": element.id}, 
                            { $inc: { [x + element.value ] : 1} })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                } else {
                    let x = "result.comment";
                    AlumniSurvey.updateOne({"_id": element.id}, 
                            { $push: { [x] : element.value } })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                }
            });
            // after all the request is done, the code comes here
            const address = new IpAddress({
                url: req.params.id,
                ip: getIp(req),
                name: 'Alumni'
            });
            address.save()
            .catch(err => console.log(err));
            // update number of survey takers            
            AlumniSurvey.updateOne({"type": "detail"}, { $inc: {"result.numberOfParts": 1} })
            .catch(err => console.log(err));
            res.json({ message: {msgBody: "Success. You will be soon redirected.", msgError: false} });
   } else {
            // console.log("You already took the survey.");
            res.json({message: {msgBody: "Error already took the survey.", msgError: true} });
        }
    });
}

// getting the details of the url and count of links available i.e the detail
exports.iab_url_get = function(req, res){
    async.parallel({
        details: function(callback){
            IabSurvey.findOne({"type": "detail"}, callback);
        },
        number_url: function(callback){
            IabSurvey.countDocuments({"type": "url"}, callback);
        },
        number_detail: function(callback) {
            IabSurvey.countDocuments({"type": "detail"}, callback);
        },
        urlId: function(callback){
            IabSurvey.findOne({"type": "url"}, {"_id": 1}, callback);
        },
    }, function(err, result){
        if (err) console.log(err);
        if (!result) res.send(null);
        res.send(result);
    });
}

// update url details part searching by type of detail
exports.iab_url_post = function(req, res) {
    IabSurvey.findOneAndUpdate({ "type": "detail" }, {
        title: req.body.title,
        type: 'detail',
        result: {
            year: req.body.year,
            name: 'Iab'
        }
    })
    .then(updated => {
        res.send(updated)
    })
    .catch(err => console.log(err));
};

exports.iab_url_create_post = function(req, res){
    const urlDetails = {
        title: 'The Computer Science department constantly improve the quality of its services to the students. Your feedback will be used to help to determine how we can best serve students in the future.',
        type: 'detail',
        result: {
            year: new Date().getFullYear(),
            name: 'Iab'
        }
    };
    const url = {
        title: 'url',
        type: 'url'
    };

    IabSurvey.countDocuments({ type: 'detail' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlDetailSave = new IabSurvey(urlDetails);
            urlDetailSave.save();
        }
    }).catch(err => console.log(err));
    IabSurvey.countDocuments({ type: 'url' }, function(err, count) {
        if (count === 0) {  // no details present
            const urlSave = new IabSurvey(url);
            urlSave.save();
        }
    }).catch(err => console.log(err));

    res.json({ "status": "Saved" });
}


// delete url, delete only the url, not the detail
exports.iab_url_delete_post = function(req, res){
    if (req.params.id) {
        IabSurvey.findOneAndDelete({ "type": "url" })
        .then(data => {
            res.json({message: { msgBody: "Deleting Survey Link.", msgError: true }});           
        })
        .catch(err => console.log(err));
    }
}

// archive url
// while deleting take all the results and put it into archive table
exports.iab_url_archive_post = function(req, res){
    // check if we have valid id being passed as type url is only one
    if (req.params.id) {        // see if we have id present
        const body = {
            // semester: "",
            year: "",
            name: "",
            numberOfParts: 0,
            result: []
        };
        // get things in parallel
        async.parallel({
            detail: function(callback) {
                IabSurvey.findOne({ $and: [{"_id" : req.params.id}, {"type": "detail"} ] },  
                callback);
            },
            question: function(callback) {
                IabSurvey.find({ "type": "question" }, 
                 callback);
            }
        }, function (err, result) {     // when we get our url and questions
            if (err) console.log(err);
            if (!result)
                res.json({message: { msgBody: "Error", msgError: true }});
            if (result.detail) {
                // body.semester = result.detail.result.semester;
                body.year = result.detail.result.year;
                body.name = result.detail.result.name;
                body.numberOfParts = result.detail.result.numberOfParts;
            }
            if (result.question) {
                (result.question).forEach(element => {
                    body.result.push({
                        q_title: element.title,
                        q_type: element.input_type,
                        rate: element.result.rate,
                        comment: element.result.comment
                    });
                });
            }
            
            // now we have an object "body" with all the necessary values
            // put it into Archive Collection
            checkResult(body).then(doc => {     // check if this date's survey is already present
                if (doc === 0) {                // if new add     
                    const doc = new ArchiveResult(body);
                    doc.save();

                    async.parallel({
                        deleteIp: function(callback){
                            IpAddress.remove({ "name": body.name }, callback);
                        },
                        deleteUrl: function(callback){
                            IabSurvey.findOneAndDelete({ "type": "url" }, callback);
                        },
                        deleteDetail: function(callback){
                            IabSurvey.findOneAndDelete({ "type": "detail" }, callback);
                        },
                        deleteQuestionResults: function(callback){
                            IabSurvey.update({ "type": "question" }, {
                                $unset: { "result": {} } 
                            }, { multi: true } , callback);
                        }, function (err, result){
                            if (err) console.log(err);
                            res.json({message: { msgBody: "Saving Result!", msgError: false }});
                        }
                    });
                } else {                        // if old update
                    res.json({message: { msgBody: "The results are already available for this term. Please check if it's the current semester and year.", msgError: true }});           
                }                    
            }).catch(
                err => {
                    res.json({message: { msgBody: "Something went wrong!", msgError: true }});           
                }
            )
        });
    }
}


// if url exists, get all the questions
exports.iab_url_check_get = function(req, res){
    if (req.params.id){     // if url id is present in the link, check this
        // check if the ip address passed is not present on the list
        checkIp(req, 'Iab').then(doc => {
            if (doc === 0) {    // ip is not found
                IabSurvey.findOne({ "_id" : req.params.id, "type": "url" }, function(err, result){
                    if (err) console.log(err);
                    if (!result) {
                        res.json({"value": null});
                    }
                    if (result){            // if url is present
                        // take all the questions and pass them back,
                        // basically same as iab update get
                        async.parallel({
                            question: function(callback){
                                IabSurvey.find({"type": "question"}, callback)
                                .sort({question_type: 1})
                                .sort({input_type: -1});
                            },
                            number_question: function(callback){
                                IabSurvey.countDocuments({"type": "question"}, callback);
                            },
                            detail: function(callback){
                                IabSurvey.findOne({"type":"detail"}, {"title": 1, "_id":0}, callback);
                            }
                        }, function(err, results){
                            if (err) console.log(err);
                            res.send(results);
                        });
                    }
                });
            } else {
                res.json({ 
                    "value": "taken"
                });
            }
        });
    }
}

// post the result to the respective question
exports.iab_url_check_post = function(req, res){
    checkIp(req, 'Iab')
    .then(doc => {
        if (doc === 0) {    // nothing found
            (req.body).forEach(element => {
                if (element === null) {
                    console.log(); // empty log for null
                } else if (element.input_val === "Rate"){
                    let x = "result.rate.";
                    IabSurvey.updateOne({"_id": element.id}, 
                            { $inc: { [x + element.value ] : 1} })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                } else {
                    let x = "result.comment";
                    IabSurvey.updateOne({"_id": element.id}, 
                            { $push: { [x] : element.value } })
                            // because in a loop can't send response now, send at the end
                        .then(result => {
                            console.log(`Success updating ${element.id}`);
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({ message: {msgBody: "Error Inserting", msgError: true} });
                        });
                }
            });
            // after all the request is done, the code comes here
            const address = new IpAddress({
                url: req.params.id,
                ip: getIp(req),
                name: 'Iab'
            });
            address.save()
            .catch(err => console.log(err));
            // update number of survey takers
            IabSurvey.updateOne({"type": "detail"}, { $inc: {"result.numberOfParts": 1} })
            .catch(err => console.log(err));
            res.json({ message: {msgBody: "Success. You will be soon redirected.", msgError: false} });
        
        } else {
            // console.log("You already took the survey.");
            res.json({message: {msgBody: "Error already took the survey.", msgError: true} });
        }
    });
}


//--------------------- SENIOR SURVEY CONTROLLERS ----------------------------

// users/senior - dashboard

// exports.senior_survey_get = function(req, res){
//     async.parallel({
//         question: function(callback){
//             SeniorSurvey.find({"type": "detail"}, callback);
//         },
//         number_question: function(callback){
//             SeniorSurvey.countDocuments({"type": "question"}, callback);
//         },
//         number_url: function(callback){
//             SeniorSurvey.countDocuments({'type': 'detail'}, callback);
//         }
//     }, function(err, result){
//         if (err) console.log(err);
//         res.status(200).send(result);
//     });
// };

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
            res.json(doc)
        })
        .catch(err => { console.error(err)})
};

// edit survey questions, display
exports.senior_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            SeniorSurvey.find({"type": "question"}, callback)
            .sort({question_type: 1})
            .sort({input_type: -1});
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

// exports.alumni_survey_get = function(req, res){
//     async.parallel({
//         question: function(callback){
//             AlumniSurvey.find({"type": "url"}, callback);
//         },
//         number_question: function(callback){
//             AlumniSurvey.countDocuments({"type": "question"}, callback);
//         },
//         number_url: function(callback){
//             AlumniSurvey.countDocuments({"type": "url"}, callback);
//         }
//     }, function(err, result){
//         if (err) console.log(err);
//         res.send(result);

//     });
// };

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
            .sort({question_type: 1})
            .sort({input_type: -1});
        },
        number_question: function(callback){
            AlumniSurvey.countDocuments({"type": "question"}, callback);
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

//--------------------- IAB SURVEY ----------------------------
// users/iab/

// exports.iab_survey_get = function(req, res){
//     async.parallel({
//         question: function(callback){
//             IabSurvey.find({"type": "url"}, callback);
//         },
//         number_question: function(callback){
//             IabSurvey.countDocuments({"type": "question"}, callback);
//         },
//         number_url: function(callback){
//             IabSurvey.countDocuments({"type": "url"}, callback);
//         }
//     }, function(err, result){
//         if (err) console.log(err);
//         res.send(result);

//     });
// };

exports.iab_detail_get = function(req, res){
    res.send("iab Survey Detail get" + req.params.id);
};

exports.iab_create_get = function(req, res){
    res.send("iab Survey Create Get");
};

exports.iab_create_post = function(req, res){
    function saveIabQuestion (question) {
        const c = new IabSurvey(question)
        return c.save()
      }

    saveIabQuestion({
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

exports.iab_update_get = function(req, res){
    async.parallel({
        question: function(callback){
            IabSurvey.find({"type": "question"}, callback)
            .sort({question_type: 1})
        },
        number_question: function(callback){
            IabSurvey.countDocuments({"type": "question"}, callback);
        }
    }, function(err, result){
        if (err) console.log(err);
        res.send(result);
    });
};

exports.iab_update_post = function(req, res) {
    IabSurvey.findOneAndUpdate({"_id": req.body.id }, {
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

exports.iab_delete_get = function(req, res) {
    res.send("iab Survey Delete get");
};

exports.iab_delete_post = function(req, res) {
    IabSurvey.findOneAndDelete({ "_id": req.body.id })
    .then(deleted => {
        IabSurvey.updateMany({ question_type: {$gt: req.body.num} }, {
            $inc: { question_type: -1 }
        })
        .then(data => res.send(data))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};