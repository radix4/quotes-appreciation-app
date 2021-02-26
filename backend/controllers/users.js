const usersRouter = require('express').Router()
const User = require('../models/user') //"User" model becomes "users" collection in mongodb

// render users from database to browser
usersRouter.get('/', (request, response) => {
  User.find({}).then((users) => {
    response.json(users)
  })
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

// create user with express.post() method
usersRouter.post('/', async (request, response) => {
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

//! reset the database
// usersRouter.post('/', async (request, response) => {
//   console.log('trying to login..') //trying to delete
//   await User.deleteMany({})

//   response.status(204).end()
// })

module.exports = usersRouter
