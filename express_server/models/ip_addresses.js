const mongoose = require('mongoose');
const Schema = mongoose.Schema;

IpAddressSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, require: true },
    ip: { type: String, required: true }
});

module.exports = mongoose.model('IpAddress', IpAddressSchema);