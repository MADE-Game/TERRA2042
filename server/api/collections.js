const router = require('express').Router()
const {Collection} = require('../db/models')
module.exports = router

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

//one collection
router.get('/:collectionId', async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.collectionId)
    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//one collection for a user
// router.get('/userCollection', async (req, res, next) => {
//   try {
//     const collection = await Collection.findOne({userId: req.user.id})
//     res.json(collection)
//   } catch (err) {
//     next(err)
//   }
// })
router.get('/userCollection', async (req, res, next) => {
  try {
    const collection = await Collection.findOne({userId: req.user.id})
    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//create new collection
router.post('/', async (req, res, next) => {
  console.log(req.body.id)
  try {
    const collection = new Collection({
      userId: req.body.userId,
      name: req.body.name,
      cards: req.body.cards,
      isDeck: req.body.isDeck
    })
    const savedCollection = await collection.save()
    res.json(savedCollection)
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
