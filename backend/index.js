require('dotenv').config() // allows environment variable to be used
const express = require('express')
const app = express()
const User = require('./models/user') //"User" model becomes "users" collection in mongodb

// render users from database to browser
app.get('/api/users', (request, response) => {
  User.find({}).then((users) => {
    response.json(users)
  })
})

app.use(express.json()) // parse request.body to json, important middleware

// create user with express.post() method
app.post('/api/users', (request, response) => {
  const body = request.body

  if (body.username === undefined) {
    return response.status(400).json({ error: 'Content missing' })
  }

  // create user
  const user = new User({
    username: body.username,
    password: body.password,
    date: new Date(),
    important: true,
  })

  // save user
  user.save().then((savedUser) => {
    response.json(savedUser)
  })
})

// express app.listen() allows port to open on browser
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
