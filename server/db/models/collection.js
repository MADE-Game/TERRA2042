const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
  userId: String,
  cards: Array,
  isDeck: Boolean
})

module.exports = mongoose.model('collection', CollectionSchema)
