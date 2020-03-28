const router = require('express').Router()
const {Game, Collection, Card, User} = require('../db/models')
module.exports = router
const {
  relativizeBoard,
  objectifyBoard,
  validateBoard,
  shuffleDeck
} = require('../utils/index.js')
//all games
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find()
    res.json(games)
  } catch (err) {
    next(err)
  }
})

//one game
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId)
    res.json(game)
  } catch (err) {
    next(err)
  }
})

router.get('/load/:gameId', async (req, res, next) => {
  try {
    const gameFound = await Game.findById(req.params.gameId)

    const {_id, game, p1, p2, isFinished} = gameFound
    const parsedGame = JSON.parse(game)
    const isPlayer1 = gameFound.p1 === req.user._id.toString()
    const isPlayer2 = gameFound.p2 === req.user._id.toString()

    const isMyTurn =
      (gameFound.isP1Turn && isPlayer1) || (!gameFound.isP1Turn && isPlayer2)

    const relativeBoard = relativizeBoard(
      {p1, p2, ...parsedGame, isMyTurn},
      req.user._id
    )
    const gameToSend = {_id, game: relativeBoard, p1, p2, isFinished}
    res.json(gameToSend)
  } catch (error) {
    next(error)
  }
})
// eslint-disable-next-line complexity
router.put('/save/:gameId', async (req, res, next) => {
  try {
    const {data} = req.body

    const gameToSave = await Game.findById(req.params.gameId)
    //establish what player makes this request.
    const isPlayer1 = gameToSave.p1 === req.user._id.toString()
    const isPlayer2 = gameToSave.p2 === req.user._id.toString()
    //checks both users.
    if (gameToSave.isFinished) {
      return res.status(401).send('This game is over!')
    }
    if (!isPlayer1 && !isPlayer2) {
      return res.status(401).send('you are not a player of this game!')
    }
    //subjectifies turn.
    const isMyTurn =
      (gameToSave.isP1Turn && isPlayer1) || (!gameToSave.isP1Turn && isPlayer2)
    if (!isMyTurn) {
      return res.status(401).send('it is not your turn!')
    }
    const objectifiedGame = objectifyBoard(
      req.body,
      {p1: gameToSave.p1, game: JSON.parse(gameToSave.game)},
      req.user._id
    )
    gameToSave.game = JSON.stringify(objectifiedGame)
    gameToSave.isFinished = data.isFinished

    gameToSave.isP1Turn = isPlayer1 ? data.isMyTurn : !data.isMyTurn
    await gameToSave.save()
    res.json(gameToSave)
  } catch (error) {
    next(error)
  }
})

//completed games
router.get('/completed', async (req, res, next) => {
  try {
    const games = await Game.find({isFinished: true})
    res.json(games)
  } catch (err) {
    next(err)
  }
})

//games in progress
router.get('/running', async (req, res, next) => {
  try {
    const games = await Game.find({isFinished: false})
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.post('/newGame', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      p1: req.body.p1,
      p2: req.body.p2,
      isFinished: false
    })

    if (game) {
      return res.json(game)
    } else {
      const gameToMakeString = req.body.game

      //p1 deck
      const user1 = await User.findById(req.body.p1)
      const user2 = await User.findById(req.body.p2)
      let player1, player2

      //randomize players one and two.
      if (Math.floor(Math.random() * 10) >= 5) {
        player1 = user1
        player2 = user2
      } else {
        player1 = user2
        player2 = user1
      }
      //find both players decks.
      const collection1 = await Collection.findById(player1.selectedDeck)
      const collection2 = await Collection.findById(player2.selectedDeck)

      let deck1 = await Card.find({_id: {$in: collection1.cards}})
      let deck2 = await Card.find({_id: {$in: collection2.cards}})
      deck1 = shuffleDeck(deck1)
      deck2 = shuffleDeck(deck2)

      const p1Hand = deck1.splice(0, 3)
      const p2Hand = deck2.splice(0, 4)
      gameToMakeString.player1.hand = p1Hand
      gameToMakeString.player2.hand = p2Hand
      gameToMakeString.player1.deck = deck1
      gameToMakeString.player2.deck = deck2

      const newGame = await Game.create({
        game: JSON.stringify(gameToMakeString),
        p1: player1._id,
        p2: player2._id,
        isFinished: false,
        isP1Turn: true
      })
      return res.json(newGame)
    }
  } catch (error) {
    next(error)
  }
})
