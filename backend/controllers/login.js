const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  console.log('trying to login..')
  const body = request.body

  // find user with same user name
  const user = await User.findOne({ username: body.username })

  // check for matching passwords
  let passwordCorrect = false

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
  }

  // sign token with jwt.sign()
  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
