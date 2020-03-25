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
    const {_id, game, isFinished, isP1Turn, p1, p2} = gameFound
    const parsedGame = JSON.parse(game)
    const relativeBoard = relativizeBoard(
      {p1, p2, ...parsedGame, isP1Turn},
      req.user._id
    )
    const gameToSend = {_id, game: relativeBoard, isFinished, p1, p2}
    res.json(gameToSend)
  } catch (error) {
    next(error)
  }
})
router.put('/save/:gameId', async (req, res, next) => {
  try {
    //converting to from redux form to database form
    const {data} = req.body

    //converting to from database form to redux form.
    const gameToSave = await Game.findById(req.params.gameId)
    //establish what player makes this request.
    const isPlayer1 = gameToSave.p1 === req.user._id.toString()
    const isPlayer2 = gameToSave.p2 === req.user._id.toString()

    const isMyTurn = gameToSave.isP1Turn && isPlayer1
    if (!isPlayer1 && !isPlayer2) {
      return res.status(401).send('you are not a player of this game!')
    }
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
