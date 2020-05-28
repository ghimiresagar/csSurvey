const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// consider server error too
UserSchema.methods.comparePassword = function(password, cb){
  if (password === this.password) {
    return cb(null, this);
  } else {
    return cb(null, false);
  }
}

module.exports = mongoose.model('User', UserSchema);