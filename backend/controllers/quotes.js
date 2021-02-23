const quotesRouter = require('express').Router()
const User = require('../models/user') //"User" model becomes "users" collection in mongodb
const Quote = require('../models/quote')

quotesRouter.get('/', (request, response) => {
  Quote.find({}).then((quotes) => {
    response.json(quotes)
  })
})

quotesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: 'five' }) // hard code username for now

  const quote = new Quote({
    content: body.content,
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
