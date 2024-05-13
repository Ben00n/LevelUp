const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  lastName: String,
  isAdmin: { type: Boolean, default: false },
  currentSessionToken: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;