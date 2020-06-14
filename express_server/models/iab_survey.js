let mongoose = require('mongoose');
let Schema = mongoose.Schema;

IabSurveySchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        input_type: {type: String},
        question_type: {type: Number},
        type: {type: String, required: true, default: "question"},
        result:
            {
                semester: {type: String},
                year: {type: Number},
                name: {type: String}, 
                numberOfParts: {type: Number, default: 0},  
                rate: {
                    1: {type: Number, default: 0},
                    2: {type: Number, default: 0},
                    3: {type: Number, default: 0},
                    4: {type: Number, default: 0},
                    5: {type: Number, default: 0}
                },
                comment: {type: Array}
            }
    }
);

module.exports = mongoose.model('IabSurvey', IabSurveySchema);