import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Profile extends Component {
  render() {
    return (
      <div>
        <p>Profile</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
