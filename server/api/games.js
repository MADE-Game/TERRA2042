const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

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

router.get('/load/test', async (req, res, next) => {
  try {
    const games = await Game.find()
    //converting to from database form to redux form.
    const {_id, game, isFinished, isP1Turn} = games[0]
    const gameToSend = {_id, game: JSON.parse(game), isFinished, isP1Turn}
    res.json(gameToSend)
  } catch (error) {
    next(error)
  }
})
router.put('/save/test', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    //converting to from redux form to database form.
    const {player: player1, opponent: player2, data} = req.body
    const normalized = {
      game: {
        player1,
        player2,
        isFinished: data.isFinished,
        isP1Turn: data.isP1Turn
      }
    }
    //converting to from database form to redux form.

    const gameToSave = await Game.findOne()
    gameToSave.game = JSON.stringify(normalized.game)
    gameToSave.isFinished = normalized.isFinished
    gameToSave.isP1Turn = normalized.isP1Turn
    await gameToSave.save()
    res.json(gameToSave)
  } catch (error) {
    next(error)
  }
})
router.get('/load/:gameId', async (req, res, next) => {
  try {
    const gameFound = await Game.findById(req.params.gameId)
    //converting to from database form to redux form.
    const {_id, game, isFinished, isP1Turn} = gameFound
    const gameToSend = {_id, game: JSON.parse(game), isFinished, isP1Turn}

    res.json(gameToSend)
  } catch (error) {
    next(error)
  }
})

router.put('/save/:gameId', async (req, res, next) => {
  try {
    //converting to from redux form to database form.
    const {player: player1, opponent: player2, data} = req.body
    const normalized = {
      game: {
        player1,
        player2,
        isFinished: data.isFinished,
        isP1Turn: data.isP1Turn
      }
    }
    //converting to from database form to redux form.
    const gameToSave = await Game.findById(req.params.gameId)
    gameToSave.game = JSON.stringify(normalized.game)
    gameToSave.isFinished = normalized.isFinished
    gameToSave.isP1Turn = normalized.isP1Turn
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
