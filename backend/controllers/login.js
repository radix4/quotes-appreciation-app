const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  console.log('am i here?')
  const body = request.body

  // find user with same user name
  const user = await User.findOne({ username: body.username })

  // check for matching passwords
  let passwordCorrect = false

  if (body.password === user.password) {
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
