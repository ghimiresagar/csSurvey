let mongoose = require('mongoose');
let Schema = mongoose.Schema;

ArchiveResultSchema = new Schema(
    {
        name: { type: String, required: true },
        semester: { type: String, required: true},
        year: { type: Number, require: true},
        result: [
            {
                q_title: { type: String },
                rate: { type: Array, default: [ 0, 0, 0, 0, 0 ] },
                comment: { type: Array }
            }
        ]
    }
);

module.exports = mongoose.model('ArchiveResult', ArchiveResultSchema)