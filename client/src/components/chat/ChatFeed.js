import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getChatMessages } from '../../actions/chatActions'
import ChatItem from './ChatItem'

export class ChatFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  componentWillMount() {
    // this.props.getChatMessages()
  }

  render() {
    let { chat } = this.props
    // console.log(chat)

    let renderChat = chat.map(msg => {
      return <ChatItem key={msg._id} msg={msg} />
    })
    return <div className='row'>{renderChat}</div>
  }
}

const mapStateToProps = state => ({
  chat: state.chat
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getChatMessages })(ChatFeed)
