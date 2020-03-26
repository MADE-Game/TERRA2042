const router = require('express').Router()
const User = require('../db/models/user')
const Collection = require('../db/models/collection')
const Card = require('../db/models/card')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({userName: req.body.userName})
    const {userName, email} = user
    const password = req.body.password

    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      userName: req.body.userName,
      collections: [],
      googleId: req.body.googleId,
      password: req.body.password
    })
    let savedUser = await user.save()

    const allCards = await Card.find().limit(20)

    const collection = new Collection({
      userId: savedUser._id,
      name: 'Default Deck',
      cards: [
        ...allCards.map(card => {
          return card._id
        })
      ],
      isDeck: true
    })

    const savedCollection = await collection.save()

    savedUser.collections = [savedCollection._id]
    await savedUser.save()

    req.login(user, err => (err ? next(err) : res.json(savedUser)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
