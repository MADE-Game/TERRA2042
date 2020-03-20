'use strict'

const seeder = require('mongoose-seed')

const cardDocs = []
const gameDocs = [
  {
    game: JSON.stringify({
      player1: {
        hand: ['this', 'is', 'the', 'hand'],
        deck: [],
        inPlay: [],
        settlers: 10
      },
      player2: {
        hand: [],
        deck: [],
        inPlay: [],
        settlers: 10
      }
    }),

    isFinished: false,
    isP1Turn: true
  }
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

for (let j = 0; j < monsterNames.length; j++) {
  cardDocs.push({
    name: monsterNames[j],
    imageUrl: `images/monsters/${j + 1}.png`,
    cost: 1,
    type: 'fighter',
    attack: Math.floor(Math.random() * (95 - 55) + 55),
    health: Math.floor(Math.random() * (95 - 55) + 55)
  })
}

const data = [
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
          'server/db/models/card.js',
          'server/db/models/game.js'
        ])

        seeder.clearModels(['card', 'game'], () => {
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
