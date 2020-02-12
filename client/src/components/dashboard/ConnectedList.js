import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
// const socket
export class ConnectedList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedUsers: []
    }
    // this.socket = io('http://localhost:5000', {
    //   query: { currentUser: this.props.auth.user.id }
    // })
    this.getCurrentUsers = this.getCurrentUsers.bind(this)
  }

  componentDidMount() {
    let socket = io('http://localhost:5000', {
      query: { currentUser: this.props.auth.user.id }
    })
    console.log(this.props.auth.user.id)
    this.getCurrentUsers(socket)
  }
  getCurrentUsers(socket) {
    socket.on('new user logged in', data => console.log(data))
  }
  render() {
    return (
      <div>
        <h1>Connected Friends List</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
