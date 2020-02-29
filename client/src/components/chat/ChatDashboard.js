import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ChatDashboard extends Component {
  // componentDidMount() {
  //   if (!this.props.auth.isAuthenticated) {
  //     this.props.history.push('/login')
  //   } else {
  //     // console.log(this.props.getPosts());
  //   }
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.auth.isAuthenticated) {
  //     this.props.history.push('/login')
  //   }

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors })
  //   }
  // }
  render() {
    console.log(this.props)

    if (this.props.chat.currentChatId === '') {
      return (
        <div>
          <p>No CHat seleced</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>This is the chat dashboard</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboard)
