const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      status: {
        type: String,
        default: 'pending'
      }
    }
  ],
  pendingFriendsRequests: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      status: {
        type: String,
        default: 'pending'
      }
    }
  ],
  joined: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  }
})

module.exports = User = mongoose.model('users', UserSchema)
