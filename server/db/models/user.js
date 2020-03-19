const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  userName: String,
  googleId: String,
  collections: Array
})

module.exports = mongoose.model('user', UserSchema)
