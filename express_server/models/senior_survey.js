let mongoose = require('mongoose');
let Schema = mongoose.Schema;

SeniorSurveySchema = new Schema(
    {
        title: {type: String, required: true, unique: true},                    // title has to be unique
        input_type: {type: String},
        question_type: {type: Number},
        type: {type: String, required: true, default: "question"},              // type of question or url
        result:
            {
                semester: {type: String},                           // used with url only
                year: {type: Number},                               // used with url only
                name: {type: String},                               // used with url, senior, alumni, iba
                numberOfParts: {type: Number, default: 0},          // used with url
                rate: {type: Array, default: [0, 0, 0, 0, 0]},      // used with question results
                comment: {type: Array}                              // used with question results
            }
    }
);

module.exports = mongoose.model('SeniorSurvey', SeniorSurveySchema);