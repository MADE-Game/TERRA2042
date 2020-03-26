const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/made', {
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
