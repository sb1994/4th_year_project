import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'

import {
  MDBBtn as Button,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardImage as CardImage,
  MDBCardTitle as CardTitle,
  MDBCardText as CardText,
  MDBCol as Col,
  MDBNavLink as NavLink,
  MDBIcon as Icon
} from 'mdbreact'

export class ProfileCard extends Component {
  render() {
    let { user, auth } = this.props
    console.log(user)

    const currentUserInputs = (
      <NavLink to={`profile/edit/${auth.user._id}`}>Edit Profile</NavLink>
    )
    return (
      <Col size='12' sm='12' lg='3'>
        <Card>
          <CardImage className='img-fluid' src={user.profile_pic} waves />
          <CardBody>
            <CardTitle style={{ textAlign: 'center' }}>{user.name}</CardTitle>
            <hr />
            {user.bio === undefined ? null : (
              <CardText>
                <Icon icon='pen-alt' />
                {user.bio}
              </CardText>
            )}
            {user.githubusername === undefined ? null : (
              <CardText>
                <Icon fab icon='github' />
                {user.githubusername}
              </CardText>
            )}
            {user.website === undefined ? null : (
              <CardText>
                <Icon icon='globe' />
                {user.website}
              </CardText>
            )}
            {user.location === undefined ? null : (
              <CardText>
                <Icon icon='location-arrow' />
                {user.location}
              </CardText>
            )}
            {user.status === undefined ? null : (
              <CardText>
                <Icon icon='user-md' />
                {user.status}
              </CardText>
            )}

            {user._id === auth.user._id ? (
              <Fragment>
                <hr />
                <CardText>
                  <NavLink to={`profile/edit/${auth.user._id}`}>
                    {' '}
                    Edit Profile
                  </NavLink>
                </CardText>
              </Fragment>
            ) : null}
          </CardBody>
        </Card>
      </Col>
      // <div className='col-md-3 card' style={style.profile}>
      //   <div className='card-body'>
      //     <h2 className='card-title'>{user.name}</h2>
      //     <img src={user.profile_pic} alt='Profile Pic' className='img-fluid' />
      //     {/* <p>{user.bio}</p> */}

      //   </div>
      // </div>
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
