let mongoose = require('mongoose');
let Schema = mongoose.Schema;

IbaSurveySchema = new Schema(
    {
        semester: {type: String, required: true},
        year: {type: Date, required: true},
        result_iba: { type: Schema.Types.ObjectId, ref: 'IbaSurveyResult', required: true},
        status: { type: Boolean, required: true, default: true},
        q1: {type: String},
        q2: {type: String},
        q3: {type: String},
        q4: {type: String}
    }
);

// virtual for survey url
IbaSurveySchema.virtual('url')
    .get(function() {
        return '/survey/iba/' + this._id;
    });

module.exports = mongoose.model('IbaSurvey', IbaSurveySchema);