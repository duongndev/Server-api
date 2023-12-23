const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
