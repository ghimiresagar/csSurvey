const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AlumniSurveySchema = new Schema(
    {
        semester: {type: String, required: true},
        year: {type: Number, required: true},
        senior_result: { type: Schema.Types.ObjectId, ref: 'AlumniSurveyResult', required: true},
        q1: {type: String},
        q2: {type: String},
        q3: {type: String},
        q4: {type: String}
    }
);

// virtual for survey url
AlumniSurveySchema.virtual('url')
    .get(function() {
        return '/survey/alumni/' + this._id;
    });

module.exports = mongoose.model('AlumniSurvey', AlumniSurveySchema);