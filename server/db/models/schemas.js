const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  userName: String,
  googdleId: String,
  collections: Array
})

const CardSchema = new Schema({
  name: String,
  imageUrl: String,
  attackPoints: Number,
  defensePoints: Number
})

const GameSchema = new Schema({
  isFinished: Boolean,
  p1Score: Number,
  p2Score: Number
})

const CollectionSchema = new Schema({
  userId: String,
  cards: Array,
  isDeck: Boolean
})

module.exports = {
  UserSchema,
  CardSchema,
  GameSchema,
  CollectionSchema
}
