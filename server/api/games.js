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

router.get('/load/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findOne({_id: req.params.gameId, isFinished: false})

    res.json(game)
  } catch (error) {
    next(error)
  }
})

router.put('/save/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.gameId, {
      game: req.body.game,
      isFinished: req.body.isFinished,
      isP1Turn: req.body.isP1Turn
    })

    res.json(game)
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
