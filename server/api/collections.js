const router = require('express').Router()
const {Collection, Card, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const collections = await Collection.find()
    res.json(collections)
  } catch (err) {
    next(err)
  }
})

//returns all cards associated with collection.
router.get('/:collectionId/cards', async (req, res, next) => {
  try {
    let collection
    let cards

    if (req.params.collectionId === 'undefined') {
      collection = await Collection.findOne({userId: req.user._id})
    } else {
      collection = await Collection.findById(req.params.collectionId)
    }
    cards = await Card.find({_id: {$in: collection.cards}})
    res.json(cards)
  } catch (err) {
    next(err)
  }
})

//one collection
router.get('/:collectionId', async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.collectionId)
    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//all of a user's collections
router.get('/:userId', async (req, res, next) => {
  try {
    const collections = await Collection.findOne({
      userId: req.params.userId
    })
    res.json(collections)
  } catch (err) {
    next(err)
  }
})

//create new collection
router.post('/', async (req, res, next) => {
  try {
    const collection = await Collection.create({
      userId: req.user._id,
      name: req.body.name,
      cards: [],
      isDeck: true
    })

    await User.findByIdAndUpdate(req.user._id, {
      collections: [...req.user.collections, collection._id]
    })

    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//delete collection
router.delete('/:collectionId', async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndRemove(
      req.params.collectionId
    )
    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//update collection info
router.put('/:collectionId', async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      {
        cards: req.body.cards,
        name: req.body.name,
        isDeck: req.body.isDeck
      }
    )
    res.json(collection)
  } catch (err) {
    next(err)
  }
})
