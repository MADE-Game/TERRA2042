const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/made', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection
  .once('open', () => {
    console.log('connected to MongoDB')
  })
  .on('error', error => {
    console.log('eror:', error)
  })
