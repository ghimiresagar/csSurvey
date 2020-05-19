let mongoose = require('mongoose');
let Schema = mongoose.Schema;

AlumniSurveySchema = new Schema(
    {
        semester: {type: String, required: true},
        year: {type: Date, required: true},
        result_alumni: { type: Schema.Types.ObjectId, ref: 'AlumniSurveyResult', required: true},
        status: { type: Boolean, required: true, default: true},
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