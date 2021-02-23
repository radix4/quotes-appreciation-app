const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  console.log('trying to login..')
  const body = request.body

  const user = await User.findOne({ username: body.username }) // find user with same user name
  console.log('found..')

  let passwordCorrect = false // check for matching passwords

  console.log(body)

  // error checking when db could not find a match
  if (user === null) {
    passwordCorrect = false
  } else if (body.password === user.password) {
    passwordCorrect = true
  }

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  // generate token for user
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET) // sign token with jwt.sign()

  response.status(200).send({ token, username: user.username })
})

module.exports = loginRouter
