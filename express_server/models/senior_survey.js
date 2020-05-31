let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SeniorSurveySchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        input_type: {type: String, required: true},
        question_type: {type: Number, required: true},
        type: {type: String, required: true, default: "question"},
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

module.exports = mongoose.model('SeniorSurvey', SeniorSurveySchema);