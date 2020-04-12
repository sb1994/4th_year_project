import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { getChatMessages } from '../../actions/chatActions'
import * as _ from 'lodash'
import { ConnectedList } from '../dashboard/ConnectedList'
import { ChatFeed } from './ChatFeed'
import { ChatForm } from './ChatForm'

// import ConnectedList from '../dashboard/ConnectedList'
// const socket = io('http://localhost:5000')
export class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedUsers: {},
      users: {},
      activeChat: null,
      chatMessages: [],
      socket: null,
      text: ''
    }
  }
  componentWillMount() {
    this.props.getChatMessages()
  }
  componentDidMount() {
    // console.log(this.props.chat.)
    // if (condition) {

    // }

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      // console.log(this.props.auth)

      this.socket = io('http://localhost:5000', {
        query: { currentUser: this.props.auth.user.id }
      })
      this.socket.on('connection', connected => {
        // console.log(this.props.chat)
        this.setState({ chatMessages: this.props.chat.chat })
      })
      // console.log(this.props.getPosts());
      this.socket.on('disconnected', connections => {
        // let { connections } = connections
        let connectedUsers = connections.connections

        connectedUsers = _.entries(connectedUsers).map(p => ({
          key: p[0],
          value: p[1]
        }))

        this.setState({ users: connectedUsers, socket: this.socket })
      })
      this.socket.on('newUserConnected', connections => {
        // let { connections } = connections
        let connectedUsers = connections.connections

        connectedUsers = _.entries(connectedUsers).map(p => ({
          key: p[0],
          value: p[1]
        }))

        // console.log(connectedUsers.length)

        this.setState({ users: connectedUsers, socket: this.socket })
      })
      this.socket.on('added message', chat => {
        // this.setState({ chatMessages: chat })
        this.setState(prevState => ({
          chatMessages: [...prevState.chatMessages, chat]
        }))
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.chat.chat.length > 0) {
      this.setState({ chatMessages: nextProps.chat.chat })
    }
  }
  handleMsgInput = e => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }
  handleMsgSubmit = () => {
    this.socket.emit('add message', {
      text: this.state.text,
      sender: this.props.auth.user.id
    })
    this.setState({ text: '' })
  }

  render() {
    // console.log(this.props.auth.user);
    let { users, socket, chatMessages } = this.state

    let { chat } = this.props
    // console.log(chat.chat.length)

    return (
      <div className='container'>
        <ConnectedList connectedUsers={users} />
        {chatMessages === null ? (
          <ChatFeed chat={chat.chat} />
        ) : (
          <ChatFeed chat={chatMessages} />
        )}
        <div className='col-md-12'>
          <input
            type='text'
            placeholder='Enter comment'
            onChange={this.handleMsgInput}
            value={this.state.text}
            name='text'
          />
          <button className='btn btn-primary' onClick={this.handleMsgSubmit}>
            Add Message
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getChatMessages })(Chat)
