const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const _ = require('lodash')

const UserSchema = new Schema({
  email: String,
  imgUrl: String,
  userName: String,
  password: String,
  googleId: String,
  collections: Array,
  salt: String,
  games: Array,
  selectedDeck: String,
  selectedClass: String,
  gold: Number,
  isAdmin: Boolean
})

UserSchema.static('encryptPassword', function(plainText, salt) {
  const hash = crypto.createHash('sha1')
  hash.update(plainText)
  hash.update(salt)
  return hash.digest('hex')
})
//instance methods
UserSchema.methods.correctPassword = function(attempted) {
  return (
    UserSchema.statics.encryptPassword(attempted, this.salt) === this.password
  )
}

UserSchema.methods.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt'])
}
//class methods

UserSchema.static('generateSalt', function() {
  return crypto.randomBytes(16).toString('base64')
})

function setSaltAndPassword(next) {
  if (this.isModified('password')) {
    this.salt = UserSchema.statics.generateSalt()
    this.password = UserSchema.statics.encryptPassword(this.password, this.salt)
  }
  next()
}

UserSchema.pre('save', setSaltAndPassword)

module.exports = mongoose.model('user', UserSchema)
