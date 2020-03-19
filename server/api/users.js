const router = require('express').Router()
const {User} = require('../db/models')
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

//one user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
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
      colletions: req.body.colletions,
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
      userName: req.body.userName
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
