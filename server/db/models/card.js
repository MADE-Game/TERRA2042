const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  name: String,
  imageUrl: String,
  cost: Number,
  type: String,
  attack: Number,
  health: Number
})

module.exports = mongoose.model('card', CardSchema)
