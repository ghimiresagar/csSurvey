let SeniorSurvey = require('../models/senior_survey');

// /users/survey (senior)
exports.list_survey_senior = function(req, res, next) {
    res.send("List all recent senior surveys, NI, get");
}