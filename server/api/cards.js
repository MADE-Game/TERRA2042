const router = require('express').Router()
const {Card} = require('../db/models')
module.exports = router

//all cards
router.get('/', async (req, res, next) => {
  try {
    // if query is for cards in shop
    let cards
    if (req.query.inShop) {
      const userCards = req.user.collections
        .filter(coll => !coll.isDeck)
        .reduce((acc, current) => current.cards, [])
      cards = await Card.find({_id: {$nin: userCards}})
    } else cards = await Card.find()

    res.json(cards)
  } catch (err) {
    next(err)
  }
})

//one card
router.get('/:cardId', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
    res.json(card)
  } catch (err) {
    next(err)
  }
})
