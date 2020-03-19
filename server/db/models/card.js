const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  name: String,
  imageUrl: String,
  attackPoints: Number,
  defensePoints: Number
})

module.exports = mongoose.model('card', CardSchema)
