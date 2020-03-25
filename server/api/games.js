const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router
const {
  relativizeBoard,
  objectifyBoard,
  validateBoard
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
    //converting to from database form to redux form.
    const {_id, game, p1, p2} = gameFound
    const parsedGame = JSON.parse(game)
    const isPlayer1 = gameFound.p1 === req.user._id.toString()
    const isPlayer2 = gameFound.p2 === req.user._id.toString()

    const isMyTurn =
      (gameFound.isP1Turn && isPlayer1) || (!gameFound.isP1Turn && isPlayer2)
    const relativeBoard = relativizeBoard(
      {p1, p2, ...parsedGame, isMyTurn},
      req.user._id
    )
    const gameToSend = {_id, game: relativeBoard, p1, p2}
    res.json(gameToSend)
  } catch (error) {
    next(error)
  }
})
// eslint-disable-next-line complexity
router.put('/save/:gameId', async (req, res, next) => {
  try {
    //converting to from redux form to database form
    const {data} = req.body
    console.log('data', data)
    console.log('data.isMyTurn', data.isMyTurn)
    //converting to from database form to redux form.
    const gameToSave = await Game.findById(req.params.gameId)
    //establish what player makes this request.
    const isPlayer1 = gameToSave.p1 === req.user._id.toString()
    const isPlayer2 = gameToSave.p2 === req.user._id.toString()
    //checks both users.
    if (!isPlayer1 && !isPlayer2) {
      return res.status(401).send('you are not a player of this game!')
    }
    //subjectifies turn.
    const isMyTurn =
      (gameToSave.isP1Turn && isPlayer1) || (!gameToSave.isP1Turn && isPlayer2)
    console.log(
      'I AM PLAYER 1?',
      isPlayer1,
      'is p1 turn in db is',
      gameToSave.isP1Turn,
      'is my turn?',
      isMyTurn
    )
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
    console.log('if Im player1 i will set is p1turn to ', data.isMyTurn)

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
    const game = new Game({
      game: JSON.stringify(req.body.game),
      p1: req.body.p1,
      p2: req.body.p2,
      isFinished: false,
      isP1Turn: true
    })
    const savedGame = await game.save()
    res.json(savedGame)
  } catch (error) {
    next(error)
  }
})
