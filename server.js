const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const http = require('http')
const User = require('./api/v1/models/User')

// const keys = require("./config/key");
const socketio = require('socket.io')
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
app.use(passport.initialize())
require('./config/passport')(passport)
//parse for the jsnon data that will be passed to the frontend clients
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api/users', users)
app.use('/api/posts', posts)

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

///socket variables

let usersSock = []
let connections = {}
io.on('connection', socket => {
  // console.log(socket.handshake.query)
  let { currentUser } = socket.handshake.query

  // console.log(currentUser, 'L:65')

  User.findById(currentUser)
    .select('-password')
    .select('-friends')
    .select('-pendingFriendsRequests')
    .then(user => {
      console.log(user)
      // connections[socket.id] = user
      // console.log(connections.lengt)

      io.emit('new user logged in', { connections })
    })
    .catch(err => {
      console.log(err)
    })

  // connections.push(socket);

  // console.log(`Sockets connected: ${connections.length}`)

  // //connects disconnection
  socket.on('disconnect', data => {
    // connections.splice(connections.indexOf(socket), 1)
    console.log(`Socket Disconnected: ${connections.length} `)
    // connections = connections.filter(socket => connections.includes(socket.id))
    // connections = Object.keys(connections).filter(key => key !== socket.id)
    // console.log(connections)
  })

  // socket.on("send message", data => {
  //   io.emit("newMessage", {
  //     msg: data.text,
  //     id: data.id
  //   });
  //   console.log(data);
  // });

  console.log('User has logged in and connected to socket')

  // socket.emit(
  //   "newMessage",
  //   generateMessage("Admin", "Welcome to the chat app")
  // );

  // socket.broadcast.emit(
  //   "newMessage",
  //   generateMessage("Admin", "New User has joind the Chat app")
  // );

  // socket.on("createMessage", (message, callback) => {
  //   console.log("createMessage", message);
  //   io.emit("newMessage", generateMessage(message.from, message.text));
  //   callback("This is the server");
  // });
  // socket.emit("newMessage", { from: "Joe", text: "Help me with this project" });
  // socket.on("disconnect", () => {
  //   console.log("Client was disconnected from the server");
  // });
})
