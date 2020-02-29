const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String
  },
  postImgURL: {
    type: String
  },
  comments: [
    {
      name: 'comment',
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  feedId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('posts', PostSchema)
