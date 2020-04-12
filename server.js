const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const http = require('http')
const User = require('./api/v1/models/User')
const Message = require('./api/v1/models/Message')

// const keys = require("./config/key");
const socketio = (module.exports.socketio = require('socket.io'))
const cors = require('cors')
dotenv.config()

const { generateMessage } = require('./config/message')
const app = express()

// const db = process.env.DB_URI || "mongodb://localhost:27017/socialweb";
// const db = "mongodb://localhost:27017/socialweb";
const db =
  'mongodb+srv://admin123:admin123@cluster0-jhik6.mongodb.net/test?retryWrites=true&w=majority'
mongoose
  .connect(db, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
const users = require('./api/v1/routes/users')
const posts = require('./api/v1/routes/posts')
const chatrouter = require('./api/v1/routes/chat')
app.use(passport.initialize())
require('./config/passport')(passport)
//parse for the jsnon data that will be passed to the frontend clients
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/chat', chatrouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.io = io

module.exports = server

///socket variables

let usersSock = []
let connections = {}
let chat = []
io.on('connection', socket => {
  let { query } = socket.handshake

  if (query.currentUser === undefined) {
    console.log(query.currentUser, socket.id)
  } else {
    User.findById(query.currentUser)
      .select('-password')
      .select('-friends')
      .select('-pendingFriendsRequests')
      .then(user => {
        // socket.user = user

        // console.log(socket)

        connections[user._id] = user
        connections[user._id].socket = socket.id

        // console.log(connections.lengt)

        // console.log(socket.id)
        io.emit('newUserConnected', { connections })
      })
      .catch(err => {
        console.log(err)
      })
  }
  socket.on('add message', data => {
    console.log(data)

    let messages = []
    let newMessage = new Message({
      user: data.sender,
      text: data.text
    })
    // console.log(newMessage)

    newMessage.save().then(message => {
      Message.findById(message._id)
        .populate('user')
        .then(message => {
          // chat.push(message)

          // log
          // console.log(chat)
          io.emit('added message', message)

          console.log(message)
        })
        .catch(err => {
          console.log(err)
        })
    })

    // console.log(newMessage)
  })

  socket.on('disconnect', data => {
    // connections.splice(connections.indexOf(socket), 1)
    console.log(`Socket Disconnected: ${socket.id} `)

    let { query } = socket.handshake
    delete connections[query.currentUser]
    // connections = connections.filter(socket => connections.includes(socket.id))
    // connections = Object.keys(connections).filter(key => key !== socket.id)
    // console.log(connections)
    io.emit('disconnected', { connections })
  })
})
