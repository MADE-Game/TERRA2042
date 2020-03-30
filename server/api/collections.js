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
    const cards = await Card.find({_id: {$in: collection.cards}})
    res.json({...collection._doc, cards})
  } catch (err) {
    next(err)
  }
})

//all of a user's collections
router.get('/users/:userId', async (req, res, next) => {
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
    let collection = await Collection.findOne({name: req.body.name})
    if (collection) return res.status(206).json(collection.name)
    else {
      collection = await Collection.create({
        userId: req.user._id,
        name: req.body.name,
        cards: [],
        isDeck: true
      })
    }
    // before, we were only appending the collection id to the collections array
    // (collections: [...req.user.collections, collection._id])
    // but we decided we want the whole object
    // look here if something breaks in the front end
    await User.findByIdAndUpdate(
      req.user._id,
      {
        collections: [...req.user.collections, collection]
      },
      {new: true}
    )

    res.json(collection)
  } catch (err) {
    next(err)
  }
})

//delete collection
router.delete('/:collectionId', async (req, res, next) => {
  try {
    await Collection.findByIdAndRemove(req.params.collectionId)

    await User.findByIdAndUpdate(
      req.user._id,
      {
        collections: req.user.collections.filter(
          coll => coll._id.toString() !== req.params.collectionId
        )
      },
      {new: true}
    )

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//update collection info
router.put('/:collectionId', async (req, res, next) => {
  try {
    // had to comment this out to make the route below work
    // if (!req.body.isDeck) {
    //   return res.status(401).send('you cannot edit this!')
    // }

    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      {
        cards: req.body.cards.map(card =>
          typeof card === 'string' ? card : card._id
        ),
        name: req.body.name
      },
      {new: true}
    )
    const cards = await Card.find({_id: {$in: collection.cards}})
    res.json({...collection._doc, cards})
  } catch (err) {
    next(err)
  }
})

// add a card to users "My Cards" collection
router.put('/user/userCards', async (req, res, next) => {
  try {
    const collection = await Collection.findOneAndUpdate(
      {isDeck: false, userId: req.user._id},
      {
        cards: req.body.cards
      },
      {new: true}
    )

    await User.findByIdAndUpdate(
      req.user._id,
      {
        collections: req.user.collections.map(coll =>
          coll._id.toString() === collection._id.toString() ? collection : coll
        ),
        gold: req.user.gold - req.body.cardCost
      },
      {new: true}
    )

    res.json(collection)
  } catch (error) {
    next(error)
  }
})
