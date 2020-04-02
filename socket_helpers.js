const User = require('./api/v1/models/User')

const addNewConnectedUser = (connections, id) => {
  let newConnections = Object.assign({}, connections)

  User.findById(id)
    .select('-password')
    .select('-friends')
    .select('-pendingFriendsRequests')
    .then(user => {
      // socket.user = user

      // console.log(socket)

      newConnections[user._id] = user

      // console.log(connections.lengt)
      return newConnections

      // console.log(socket.id)
      // io.emit('newUserConnected', { connections })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = { addNewConnectedUser }
