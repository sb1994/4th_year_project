import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CurrentFriendCard } from './CurrentFriendCard'

class CurrentFriends extends Component {
  render() {
    let { friends } = this.props.auth.user
    let renderFriends

    if (friends && friends.length > 0) {
      renderFriends = friends.map(friend => {
        return <CurrentFriendCard key={friend.user} user={friend.user} />
      })
    } else {
      renderFriends = <div>You have no Friends</div>
    }
    return (
      <div>
        <h2>Current Friends</h2>
        {renderFriends}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentFriends)
