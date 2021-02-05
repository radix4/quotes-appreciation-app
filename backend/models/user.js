const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.TEST_MONGODB_URI

// connect to database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

// define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date,
  important: Boolean,
})

// this reformats mongo's id and versioning field
// mongo's id field looks like a string, but it's an object, watch out, and
// the toJSON method here takes care of it just in case
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', userSchema)
