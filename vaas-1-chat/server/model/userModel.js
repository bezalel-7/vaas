const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 24,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    max: 24,
  },
  password: {
    type: String,
    require: true,
    max: 24,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('Users', userSchema)
