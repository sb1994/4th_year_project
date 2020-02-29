import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import ConnectedUsers from './ConnectedUsers'
import ChatDashboard from '../chat/ChatDashboard'
// const socket
export class ConnectedList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedUsers: {}
    }

    // this.socket = io('http://localhost:5000', {
    //   query: { currentUser: this.props.auth.user.id }
    // })
    // this.socket = io('http://localhost:5000', {
    //   query: { currentUser: this.props.auth.user.id }
    // })

    this.socket = io(process.env.REACT_APP_SOCKET, {
      query: { currentUser: this.props.auth.user.id }
    })
    this.getCurrentUsers = this.getCurrentUsers.bind(this)
    this.getState = this.getState.bind(this)

    this.socket.on('currentUsers', data => {
      this.setState({
        loggedUsers: data.connections
      })

      console.log(this.state, 'User logged out')
    })
    this.socket.on('newUserConnected', data => {
      this.setState({ loggedUsers: data.connections })
      // console.log(this.state)
    })
  }

  componentDidMount() {
    // console.log(process.env.REACT_APP_SOCKET_URI)
    // // console.log(this.props.auth.user.id)
    this.getCurrentUsers(this.socket)
    // console.log(this.socket)
  }
  componentWillUnmount() {
    // socket.
    this.socket.disconnect()
    console.log('Socket will disconnect when component is unmounted')

    // console.log(this.socket.id)
  }
  getCurrentUsers(socket) {
    socket.on('new user logged in', data => {
      this.setState({ loggedUsers: data.connections })
      // console.log(data)
    })

    // console.log(this.state)

    // so
  }
  getState() {
    console.log(this.state)
  }
  render() {
    // console.log(this.state)
    let { loggedUsers } = this.state

    // console.log(loggedUsers)

    return (
      <div className='col-md-4'>
        {/* <h1>Connected Friends List</h1> */}
        <ConnectedUsers socket={this.socket} connectedUsers={loggedUsers} />
        <ChatDashboard socket={this.socket} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
