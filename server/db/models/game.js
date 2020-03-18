const mongoose = require('mongoose')
const {GameSchema} = require('./schemas')

module.exports = mongoose.model('game', GameSchema)
