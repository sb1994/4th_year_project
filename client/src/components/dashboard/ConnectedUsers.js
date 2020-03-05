import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConnectedListUser from './ConnectedListUser'
class ConnectedUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    let { auth, connectedUsers, socket } = this.props

    let renderUsers = []
    for (const key of Object.keys(connectedUsers)) {
      // console.log(key, connectedUsers[key].active)
      if (connectedUsers[key]._id !== auth.user.id) {
        renderUsers.push(connectedUsers[key])
      }
      // let user = {active:connectedUsers[key].active,}
    }
    renderUsers = renderUsers.map((user, index) => {
      return (
        <ConnectedListUser key={index} user={user} socket={socket} />
      )
    })
    return (
      <div>
        <ul className='list-group'>{renderUsers}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers)
