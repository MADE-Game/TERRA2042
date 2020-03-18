'use strict'

const seeder = require('mongoose-seed')
const {User, Card} = require('../server/db/models')

seeder.connect('mongodb://localhost/made', () => {
  seeder.loadModels([
    '../server/db/models/user.js',
    '../server/db/models/card.js'
  ])
})

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
