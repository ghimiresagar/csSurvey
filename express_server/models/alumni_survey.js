let mongoose = require('mongoose');
let Schema = mongoose.Schema;

AlumniSurveySchema = new Schema(
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
                rate: {type: Array, default: [0, 0, 0, 0, 0]},
                comment: {type: Array}
            }
    }
);

module.exports = mongoose.model('AlumniSurvey', AlumniSurveySchema);