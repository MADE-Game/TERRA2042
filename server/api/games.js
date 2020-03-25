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
    const objectifiedGame = objectifyBoard(
      req.body,
      {p1: gameToSave.p1, game: JSON.parse(gameToSave.game)},
      req.user._id
    )
    validateBoard(
      objectifiedGame,
      {...gameToSave, game: JSON.parse(gameToSave.game)},
      req.user._id.toString()
    ) //will throw error on invalid move.
    gameToSave.game = JSON.stringify(objectifiedGame)
    gameToSave.isFinished = data.isFinished
    gameToSave.isP1Turn = data.isP1Turn
    await gameToSave.save()
    res.json(gameToSave)
  } catch (error) {
    if (error.message.startsWith('Invalid move!')) {
      return res.status(401).send(error.message)
    }
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
