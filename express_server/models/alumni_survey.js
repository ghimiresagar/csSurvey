let mongoose = require('mongoose');
let Schema = mongoose.Schema;

AlumniSurveySchema = new Schema(
    {
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
AlumniSurveySchema.virtual('url')
    .get(function() {
        return '/survey/alumni/' + this._id;
    });

module.exports = mongoose.model('AlumniSurvey', AlumniSurveySchema);