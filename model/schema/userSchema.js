const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  admin: Boolean  
}, {versionKey : false}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema, 'users');
