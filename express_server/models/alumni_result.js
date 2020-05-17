const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AlumniSurveyResultSchema = new Schema(
    {
        senior_survey: { type: Schema.Types.ObjectId, ref: 'AlumniSurvey', required: true},
        q1: {type: Number},
        q2: {type: Number},
        q3: {type: Number},
        q4: {type: Number}
    }
);

// virtual for survey url
AlumniSurveyResultSchema.virtual('url')
    .get(function() {
        return '/survey/senior/result/' + this._id;
    });

module.exports = mongoose.model('AlumniSurvey', AlumniSurveyResultSchema);