'use strict'

const seeder = require('mongoose-seed')

const userDocs = []
const cardDocs = []
const gameDocs = [
  {
    game: JSON.stringify({}),

    isFinished: false,

    turn: '123'
  }
]

const emails = [
  'cmax1018@gmail.com',
  'akil.grant.93@gmail.com',
  'dyhorgan@gmail.com',
  'ecanals07@gmail.com'
]

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
  'Banshees'
]

for (let i = 0; i < emails.length; i++) {
  userDocs.push({
    email: emails[i],
    userName: emails[i].split('@')[0],
    googleId: emails[i],
    collections: []
  })
}

for (let j = 0; j < monsterNames.length; j++) {
  cardDocs.push({
    name: monsterNames[j],
    imageUrl: `/images/${j + 1}.png`,
    cost: 10,
    type: 'fighter',
    attack: Math.floor(Math.random() * (95 - 55) + 55),
    health: Math.floor(Math.random() * (95 - 55) + 55)
  })
}

const data = [
  {
    model: 'user',
    documents: userDocs
  },

  {
    model: 'card',
    documents: cardDocs
  },

  {
    model: 'game',
    documents: gameDocs
  }
]

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  try {
    seeder.connect(
      'mongodb://localhost/made',
      {useUnifiedTopology: true},
      () => {
        seeder.loadModels([
          'server/db/models/user.js',
          'server/db/models/card.js',
          'server/db/models/game.js'
        ])

        seeder.clearModels(['user', 'card', 'game'], () => {
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
