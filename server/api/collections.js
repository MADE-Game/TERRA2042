const router = require('express').Router()
const {Collection} = require('../db/models')
module.exports = router

//all collections
router.get('/', async (req, res, next) => {
  try {
    const collections = await Collection.find()
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
router.get('/userCollection', async (req, res, next) => {
  try {
    const collection = await Collection.findOne({userId: req.user.id})
    res.json(collection)
  } catch (err) {
    next(err)
  }
})
