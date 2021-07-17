const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require("dotenv").config();
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/auth', require(
  './routes/auth.routes'
))
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'))
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.port || 5000

const start = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} `)
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}



start()