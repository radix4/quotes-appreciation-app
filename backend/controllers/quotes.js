const quotesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user') //"User" model becomes "users" collection in mongodb
const Quote = require('../models/quote')

quotesRouter.get('/', (request, response) => {
  Quote.find({}).then((quotes) => {
    response.json(quotes)
  })
})

quotesRouter.get('/:id', async (request, response) => {
  const quote = await Quote.findById(request.params.id)
  if (quote) {
    response.json(quote.toJSON())
  } else {
    response.status(404).end()
  }
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
    content: body.content,
    author: body.author,
    vote: body.vote,
    date: new Date(),
    user: user._id,
  })

  const savedQuote = await quote.save()
  user.quotes = user.quotes.concat(savedQuote._id)
  await user.save()
  response.json(savedQuote.toJSON())
})

quotesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const quote = {
    vote: body.vote,
  }

  Quote.findByIdAndUpdate(request.params.id, quote, { new: true })
    .then((updatedQuote) => {
      response.json(updatedQuote.toJSON())
    })
    .catch((error) => next(error))
})

module.exports = quotesRouter
