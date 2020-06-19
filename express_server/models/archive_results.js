let mongoose = require('mongoose');
let Schema = mongoose.Schema;

ArchiveResultSchema = new Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, require: true},
        numberOfParts: { type: Number, require: true },
        result: [
            {
                q_title: { type: String, required: true },
                q_type: { type: String, required: true },
                rate: { type: Object },
                comment: { type: Array }
            }
        ]
    }
);

module.exports = mongoose.model('ArchiveResult', ArchiveResultSchema)