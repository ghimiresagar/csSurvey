const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let SeniorSurveySchema = new Schema(
    {
        semester: {type: String, required: true},
        year: {type: Number, required: true},
        senior_result: { type: Schema.Types.ObjectId, ref: 'SeniorSurveyResult', required: true},
        q1: {type: String},
        q2: {type: String},
        q3: {type: String},
        q4: {type: String}
    }
);

// virtual for survey url
SeniorSurveySchema.virtual('url')
    .get(function() {
        return '/survey/senior/' + this._id;
    });

module.exports = mongoose.model('SeniorSurvey', SeniorSurveySchema);