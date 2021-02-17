require('dotenv').config() // allows environment variable to be used
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json()) // parse request.body to json, important middleware

const User = require('./models/user') //"User" model becomes "users" collection in mongodb
const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

// render users from database to browser
app.get('/api/users', (request, response) => {
  User.find({}).then((users) => {
    response.json(users)
  })
})

// reset the test database
app.post('/api/reset', async (request, response) => {
  console.log('trying to login..') //trying to delete
  await User.deleteMany({})

  response.status(204).end()
})

// create user with express.post() method
app.post('/api/users', async (request, response) => {
  const body = request.body

  console.log(body)

  // create user
  const user = new User({
    username: body.username,
    password: body.password,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('Finally!!!')
  console.log(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint) // error if request to a non-existent endpoint
app.use(requestLogger)
app.use(errorHandler)

// express app.listen() allows port to open on browser
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
