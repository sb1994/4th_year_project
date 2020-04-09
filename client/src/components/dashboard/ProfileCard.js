import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import {
  MDBBtn as Button,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBNavLink as NavLink
} from 'mdbreact'

export class ProfileCard extends Component {
  render() {
    let { user, auth } = this.props
    console.log(user)

    const currentUserInputs = (
      <NavLink to={`profile/edit/${auth.user._id}`}>Edit Profile</NavLink>
    )
    return (
      <div className='col-md-3 card' style={style.profile}>
        <div className='card-body'>
          <h2 className='card-title'>{user.name}</h2>
          <img src={user.profile_pic} alt='Profile Pic' className='img-fluid' />
          {user.bio === undefined ? null : <p>{user.bio}</p>}
          {/* <p>{user.bio}</p> */}
          {user.githubusername === undefined ? null : (
            <p>
              <FontAwesomeIcon icon={faGlobeEurope} />
              {user.githubusername}
            </p>
          )}
          {user.website === undefined ? null : <p>{user.website}</p>}
          {user.location === undefined ? null : <p>{user.location}</p>}
          {user.status === undefined ? null : <p>{user.status}</p>}
          {user._id === auth.user._id ? currentUserInputs : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}
const style = {
  profile: {
    // height: 500
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
)
