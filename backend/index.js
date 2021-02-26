require('dotenv').config() // allow environment variable to be used
const express = require('express')
require('express-async-errors') // allow middleware to catch errors
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
app.use(express.json()) // parse request.body to json, important middleware
const middleware = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const quotesRouter = require('./controllers/quotes')

app.use('/api/quotes', quotesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint) // error if request to a non-existent endpoint
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

// express app.listen() allows port to open on browser
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
