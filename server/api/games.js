const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

//all games
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find()
    // should we create another route to do this?
    // this doesn't include the isFinished and isP1Turn props
    // maybe have another route like '/snapshot' that only sends the game prop
    // and have a regular route that sends all props
    res.json(JSON.parse(games[0].game))
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
