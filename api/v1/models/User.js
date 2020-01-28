const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      status: {
        type: String,
        default: "pending"
      }
    }
  ],
  joined: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
