'use strict'
const seeder = require('mongoose-seed')

const monsterNames = [
  'Centaurs',
  'Basilisks',
  'Chimera',
  'Medusa',
  'Cyclopes',
  'Minotaur',
  'Kraken',
  'Cerberus',
  'Sphinx',
  'Lernaean',
  'Hydra',
  'Kappas',
  'Lamia',
  'Charybdis',
  'Harpies',
  'Typhon',
  'Echidna',
  'Furies',
  'Scylla',
  'Banshees',
  'Shop 1',
  'Shop 2',
  'Shop 3',
  'Shop 4',
  'Shop 5',
  'Shop 6',
  'Shop 7',
  'Shop 8',
  'Shop 9',
  'Shop 10'
]

const cardDocs = require('./catalog')

const userDoc = [
  {
    email: 'admin@admin.com',
    imgUrl: '',
    userName: 'admin',
    password: 'made',
    gold: 1000,
    isAdmin: true
  }
]

const data = [
  {
    model: 'card',
    documents: cardDocs
  },
  {
    model: 'user',
    documents: userDoc
  }
]

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  try {
    seeder.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/made',
      {useUnifiedTopology: true},
      () => {
        seeder.loadModels([
          'server/db/models/card.js',
          'server/db/models/game.js',
          'server/db/models/user.js',
          'server/db/models/collection.js'
        ])

        seeder.clearModels(['card', 'game', 'user', 'collection'], () => {
          seeder.populateModels(data, () => {
            seeder.disconnect()
          })
        })
      }
    )
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
