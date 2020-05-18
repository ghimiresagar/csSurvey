let AlumniSurvey = require('../models/alumni_survey');

// /users/survey (senior)
exports.list_survey_alumni = function(req, res, next) {
    res.send("List all recent alumni surveys, NI, get");
}