let User = require('../models/user');

exports.index = function (req, res, next) {
    res.send("Login to manage surveys.");
}

exports.authenticate = function (req, res, next) {
    res.send("User authentication, NI, post");
};

exports.list_surveys = function(req, res, next) {
    res.send("List all Recent surveys, NI, get");
};

exports.list_surveys_result = function(req, res, next) {
    res.send("list recent survey results, NI, get");
}