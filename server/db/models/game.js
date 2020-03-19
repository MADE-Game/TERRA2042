const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const GameSchema = new Schema({
//   isFinished: Boolean,
//   p1Score: Number,
//   p2Score: Number
// })

const GameSchema = new Schema({
  game: String,
  isFinished: Boolean,
  turn: String
})

module.exports = mongoose.model('game', GameSchema)
