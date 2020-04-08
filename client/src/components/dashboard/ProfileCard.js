import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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

    const currentUserInputs = (
      <NavLink to={`profile/edit/${auth.user._id}`}>Edit Profile</NavLink>
    )
    return (
      <Fragment>
        <div className='col-md-2 card' style={style.profile}>
          <div className='card-body'>
            <h2 className='card-title'>{auth.user.name}</h2>
            <img
              src={auth.user.profile_pic}
              alt='Profile Pic'
              className='img-fluid'
            />
            {/* {user._id === auth.user._id ? currentUserInputs : ''} */}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}
const style = {
  profile: {
    height: 500
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
