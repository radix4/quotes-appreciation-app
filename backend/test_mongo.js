require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI
// connect to db
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date,
  important: Boolean,
})

//"User" becomes "users" collection in mongodb
const User = mongoose.model('User', userSchema)

// create a user
const user = new User({
  username: 'thang',
  password: 'shokuni',
  date: new Date(),
  important: true,
})

//save user to db
user.save().then((result) => {
  console.log('Users saved!')
  mongoose.connection.close() //! without closing, whole operation is down
})

//query all users
User.find({ important: true }).then((result) => {
  result.forEach((user) => {
    console.log(user)
  })
  mongoose.connection.close()
})
