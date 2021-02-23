const quotesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user') //"User" model becomes "users" collection in mongodb
const Quote = require('../models/quote')

quotesRouter.get('/', (request, response) => {
  Quote.find({}).then((quotes) => {
    response.json(quotes)
  })
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  console.log('authorization: ', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

quotesRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const quote = new Quote({
    content: body.quote,
    author: body.author,
    date: new Date(),
    user: user._id,
  })

  const savedQuote = await quote.save()
  user.quotes = user.quotes.concat(savedQuote._id)
  await user.save()
  response.json(savedQuote.toJSON())
})

module.exports = quotesRouter
