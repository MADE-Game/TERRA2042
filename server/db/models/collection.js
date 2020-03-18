const mongoose = require('mongoose')
const {CollectionSchema} = require('./schemas')

module.exports = mongoose.model('collection', CollectionSchema)
