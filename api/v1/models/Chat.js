const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ChatSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  messages: [
    {
      name: 'message',
      type: Schema.Types.ObjectId,
      ref: 'messages'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = Chat = mongoose.model('chats', ChatSchema)
