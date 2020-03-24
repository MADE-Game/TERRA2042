'use strict'
const {ObjectId} = require('mongodb')
const seeder = require('mongoose-seed')

const cardDocs = []
const gameDocs = [
  {
    _id: ObjectId('111111111111111111111110'),
    game: JSON.stringify({
      player2: {
        hand: [
          // {
          //   id: 13,
          //   name: 'handtest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/1.png`
          // }
        ],
        deck: [
          // {
          //   id: 12,
          //   name: 'decktest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/2.png`
          // }
        ],
        inPlay: [
          // {
          //   id: 11,
          //   name: 'inplaytest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/4.png`
          // }
        ],
        settlers: 10
      },
      player1: {
        hand: [],
        deck: [],
        inPlay: [],
        settlers: 10
      }
    }),
    isFinished: false,
    isP1Turn: true,
    p1: '111111111111111111111111',
    p2: '111111111111111111111112'
  },

  {
    _id: ObjectId('111111111111111111111112'),
    game: JSON.stringify({
      player2: {
        hand: [
          // {
          //   id: 13,
          //   name: 'handtest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/1.png`
          // }
        ],
        deck: [
          // {
          //   id: 12,
          //   name: 'decktest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/2.png`
          // }
        ],
        inPlay: [
          // {
          //   id: 11,
          //   name: 'inplaytest',
          //   attack: 1,
          //   health: 2,
          //   imageUrl: `/images/monsters/4.png`
          // }
        ],
        settlers: 10
      },
      player1: {
        hand: [],
        deck: [],
        inPlay: [],
        settlers: 10
      }
    }),
    isFinished: false,
    isP1Turn: true,
    p1: '111111111111111111111111',
    p2: '111111111111111111111112'
  }
]
const userDocs = [
  {
    _id: ObjectId('111111111111111111111111'),
    email: 'cmax1018@gmail.com',
    password: 'abc',
    games: [ObjectId('111111111111111111111110')]
  },
  {
    _id: ObjectId('111111111111111111111112'),
    email: 'opp@gmail.com',
    password: 'abc',
    games: [ObjectId('111111111111111111111110')]
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
    imageUrl: `/images/monsters/${j + 1}.png`,
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
  },
  {
    model: 'user',
    documents: userDocs
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
          'server/db/models/game.js',
          'server/db/models/user.js'
        ])

        seeder.clearModels(['card', 'game', 'user'], () => {
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
