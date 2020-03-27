const router = require('express').Router()
const {User, Collection} = require('../db/models')

module.exports = router

//all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/collections/selected', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const deck = await Collection.findOne({
      userId: req.user._id,
      name: req.body.name
    })
    await User.findByIdAndUpdate(req.user._id, {
      selectedDeck: deck._id
    })
    res.json(deck)
  } catch (e) {
    console.error(e)
  }
})

router.get('/:userId/collections', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const collections = await Collection.find({_id: {$in: user.collections}})
    res.json(collections)
  } catch (err) {
    next(err)
  }
})

//new user
router.post('/ ', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      userName: req.body.userName,
      collections: req.body.collections,
      googleId: req.body.googleId
    })
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    next(err)
  }
})

//delete user
router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//update user info
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      email: req.body.email,
      userName: req.body.userName,
      imgUrl: req.body.imgUrl,
      games: req.body.games,
      collections: req.body.collections
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
