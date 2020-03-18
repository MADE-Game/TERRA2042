const mongoose = require('mongoose')
const {CardSchema} = require('./schemas')

module.exports = mongoose.model('card', CardSchema)
