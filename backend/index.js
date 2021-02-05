require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

// connect to database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date,
  important: Boolean,
})

//"User" model becomes "users" collection in mongodb
const User = mongoose.model('User', userSchema)

// render users from database to browser
app.get('/api/users', (request, response) => {
  User.find({}).then((users) => {
    response.json(users)
  })
})

// express app.listen() allows port to open on browser
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
