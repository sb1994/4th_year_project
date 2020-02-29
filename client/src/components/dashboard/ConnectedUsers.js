import React, { Component } from 'react'
import { connect } from 'react-redux'

class ConnectedUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.joinPrivateChat = this.joinPrivateChat.bind(this)
  }

  componentDidMount() {
    // console.log(this.props.auth)
  }
  joinPrivateChat() {
    console.log('This is a new chat')
  }
  render() {
    let { auth, connectedUsers, socket } = this.props
    console.log(socket)

    // console.log(connectedUsers)
    let renderUsers = []
    for (const key of Object.keys(connectedUsers)) {
      // console.log(key, connectedUsers[key].active)
      if (connectedUsers[key]._id !== auth.user.id) {
        renderUsers.push(connectedUsers[key])
      }
      // let user = {active:connectedUsers[key].active,}
    }

    console.log(renderUsers)

    renderUsers = renderUsers.map((user, index) => {
      return (
        <li
          key={index}
          className='list-group-item'
          onClick={this.joinPrivateChat}
        >
          <div>
            {user.name}
            <img
              style={{ height: '50px' }}
              src={user.profile_pic}
              alt=''
              className='img-fluid img-thumbnail'
            />
            {/* <img src={user.profile_pic} alt='' srcset='' /> */}
          </div>
        </li>
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
