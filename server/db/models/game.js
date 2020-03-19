const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  isFinished: Boolean,
  p1Score: Number,
  p2Score: Number
})

module.exports = mongoose.model('game', GameSchema)
