const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['manager', 'salesrep', 'customer'],
    required: true
  },
  username: { // passport-local-mongoose expects 'username'
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  }
});

signupSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
});

module.exports = mongoose.model('User', signupSchema);