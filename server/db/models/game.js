const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  game: String,
  isFinished: Boolean,
  isP1Turn: Boolean,
  p1: String,
  p2: String
})

module.exports = mongoose.model('game', GameSchema)
