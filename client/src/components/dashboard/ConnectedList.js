import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import ChatDashboard from '../chat/ChatDashboard'
import ConnectedListUser from '../dashboard/ConnectedListUser'

// const socket
export class ConnectedList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='col-md-12'>
        <div className='row'>
          {Object.entries(this.props.connectedUsers).map(([key, user], i) => (
            <ConnectedListUser key={key} user={user.value} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
