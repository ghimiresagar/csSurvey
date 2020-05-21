let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SeniorSurveySchema = new Schema(
    {
        _id: {type: Number, required: true, unique: true},
        title: {type: String, required: true},
        input_type: {type: String, required: true},
        question_type: {type: Number, required: true},
        result: [
            {
                semester: {type: String, default: "Fall"},
                year: {type: Number},
                number_of_parts: {type: Number, default: 0},
                rate: {type: Array, default: [0, 0, 0, 0, 0]}
            }

        ],
    }
);

// virtual for survey url
SeniorSurveySchema.virtual('url')
    .get(function() {
        return '/survey/senior/' + this._id;
    });

module.exports = mongoose.model('SeniorSurvey', SeniorSurveySchema);