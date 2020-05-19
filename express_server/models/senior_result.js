let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SeniorSurveyResultSchema = new Schema(
    {
        q1: {type: Number},
        q2: {type: Number},
        q3: {type: Number},
        q4: {type: Number}
    }
);

// virtual for survey url
SeniorSurveyResultSchema.virtual('url')
    .get(function() {
        return '/survey/senior/result/' + this._id;
    });

module.exports = mongoose.model('SeniorSurveyResult', SeniorSurveyResultSchema);