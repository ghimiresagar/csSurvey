let mongoose = require('mongoose');
let Schema = mongoose.Schema;

IbaSurveySchema = new Schema(
    {
        type: {type: String, required: true, default: "senior"},
        number: {type: Number, required: true},
        title: {type: String, required: true},
        result: [
            {
                semester: {type: String, required: true},
                year: {type: String, required: true},
                number_of_parts: {type: Number, required: true},
                rate: {type: Array, required: true, default: [0, 0, 0, 0, 0]}
            }

        ],
    }
);

// virtual for survey url
IbaSurveySchema.virtual('url')
    .get(function() {
        return '/survey/iba/' + this._id;
    });

module.exports = mongoose.model('IbaSurvey', IbaSurveySchema);