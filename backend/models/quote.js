const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

quoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Quote', quoteSchema)
