import React, { Component } from 'react'
import { connect } from 'react-redux'

class ConnectedUsers extends Component {
  componentDidMount() {
    // console.log(this.props.auth)
  }
  render() {
    let { auth, connectedUsers } = this.props
    // console.log(auth.user)

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
        <li key={index} className='list-group-item'>
          <div>
            {user.name}
            {/* <img src={user.profile_pic} alt='' srcset='' /> */}
            {/* <img src={user.profile_pic} alt='' srcset='' /> */}
          </div>
        </li>
      )
    })

    // let renderconnectedUsers = connectedUsers.map(user => {
    //   if (user._id !== auth.user.id) {
    //     console.log(user)
    //   }
    // })

    // console.log(connectedUsers)

    // console.log(this.props.connectedUsers)

    return (
      <div>
        <ul className='list-group'>
          {renderUsers}
          {/* <li className='list-group-item'>Cras justo odio</li>
          <li className='list-group-item'>Dapibus ac facilisis in</li>
          <li className='list-group-item'>Morbi leo risus</li>
          <li className='list-group-item'>Porta ac consectetur ac</li>
          <li className='list-group-item'>Vestibulum at eros</li> */}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedUsers)
