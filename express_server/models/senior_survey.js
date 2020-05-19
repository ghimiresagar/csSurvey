let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SeniorSurveySchema = new Schema(
    {
        semester: {type: String, required: true},
        year: {type: Date, required: true},
        result_senior: {type: Schema.Types.ObjectId, ref: 'SeniorSurveyResult', required: true},
        status: { type: Boolean, required: true, default: true},
        q1: {type: String},
        q2: {type: String},
        q3: {type: String},
        q4: {type: String},
    }
);

// virtual for survey url
SeniorSurveySchema.virtual('url')
    .get(function() {
        return '/survey/senior/' + this._id;
    });

module.exports = mongoose.model('SeniorSurvey', SeniorSurveySchema);