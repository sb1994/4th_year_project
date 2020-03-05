import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ConnectedListUser extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.socket = this.props.socket
    this.startPrivateChat = this.startPrivateChat.bind(this)

    this.getCurrentUsers = this.getCurrentUsers.bind(this)
  }
  getCurrentUsers(socket) {
    socket.on('currentUsers', data => {
      console.log(data);

      // this.setState({ loggedUsers: data.connections })
      // console.log(data)
    })

    // console.log(this.state)

    // so
  }
  startPrivateChat() {




    console.log(this.socket);


  }

  render() {
    let { user } = this.props
    // console.log(this.props);

    return (
      <li

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
          <button className="btn btn-primary" onClick={this.startPrivateChat}>chat</button>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state) => ({

  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedListUser)
