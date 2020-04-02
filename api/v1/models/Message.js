const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  text: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = Message = mongoose.model('messages', MessageSchema)
