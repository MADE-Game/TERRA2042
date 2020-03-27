const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User, Collection, Card} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const email = profile.emails[0].value
      const imgUrl = profile.photos[0].value
      const [userName] = email.split('@')
      const collections = []

      try {
        const user = await User.findOne({googleId: googleId})

        if (!user) {
          const newUser = new User({
            googleId,
            email,
            imgUrl,
            userName,
            collections
          })
          const allCards = await Card.find().limit(20)

          const collection = new Collection({
            userId: newUser._id,
            name: 'Default Deck',
            cards: [
              ...allCards.map(card => {
                return card._id
              })
            ],
            isDeck: true
          })

          const myCards = new Collection({
            userId: newUser._id,
            name: 'My Cards',
            cards: [
              ...allCards.map(card => {
                return card._id
              })
            ],
            isDeck: false
          })

          const savedCollection = await collection.save()
          const savedMyCards = await myCards.save()

          newUser.collections = [savedMyCards._id, savedCollection._id]
          //setting the selected deck to default deck
          newUser.selectedDeck = savedCollection._id
          await newUser.save()

          const savedUser = await newUser.save()
          done(null, savedUser)
        } else {
          done(null, user)
        }
      } catch (error) {
        done(error)
      }
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('google', {scope: ['email', 'profile']})
  )

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
