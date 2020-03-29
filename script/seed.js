'use strict'

const seeder = require('mongoose-seed')

// const monsterNames = [
//   'Centaurs',
//   'Basilisks',
//   'Chimera',
//   'Medusa',
//   'Centaurs',
//   'Basilisks',
//   'Chimera',
//   'Medusa',
//   'Cyclopes',
//   'Harpies',
//   'Typhon',
//   'Echidna',
//   'Furies',
//   'Scylla',
//   'Banshees',
//   'Charybdis',
//   'Harpies',
//   'Typhon',
//   'Echidna',
//   'Furies',
//   'Scylla',
//   'Centaurs',
//   'Basilisks',
//   'Chimera',
//   'Medusa',
//   'Cyclopes',
//   'Basilisks',
//   'Chimera',
//   'Harpies',
//   'Typhon',
//   'Chimera',
//   'Medusa',
//   'Medusa',
//   'Cyclopes',
//   'Harpies',
//   'Typhon',
//   'Scylla',
//   'Centaurs',
//   'Basilisks',
//   'Chimera',
//   'Medusa'
// ]

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

const cardDocs = []

for (let j = 0; j < monsterNames.length; j++) {
  cardDocs.push({
    name: monsterNames[j],
    imageUrl:
      j < 20 ? `/images/monsters/${j + 1}.png` : `/images/monsters/${422}.png`,
    cost: 1,
    type: 'fighter',
    attack: Math.floor(Math.random() * (5 - 1) + 1),
    health: Math.floor(Math.random() * (5 - 1) + 1)
  })
}

const data = [
  {
    model: 'card',
    documents: cardDocs
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
