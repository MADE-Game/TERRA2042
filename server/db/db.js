const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/made', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection
  .once('open', () => {
    console.log('connected')
  })
  .on('error', error => {
    console.log('eror:', error)
  })
