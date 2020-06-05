const mongoose = require('mongoose');
const Schema = mongoose.Schema;

IpAddressSchema = new Schema({
    url: { type: String, required: true },
    ip: { type: String, required: true }
});

module.exports = mongoose.model('IpAddress', IpAddressSchema);