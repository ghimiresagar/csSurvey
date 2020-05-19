let mongoose = require('mongoose');
let Schema = mongoose.Schema;

IbaSurveyResultSchema = new Schema(
    {
        q1: {type: Number},
        q2: {type: Number},
        q3: {type: Number},
        q4: {type: Number}
    }
);

// virtual for survey url
IbaSurveyResultSchema.virtual('url')
    .get(function() {
        return '/survey/iba/result/' + this._id;
    });

module.exports = mongoose.model('IbaSurveyResult', IbaSurveyResultSchema);