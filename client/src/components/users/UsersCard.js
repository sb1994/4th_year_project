import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow } from 'mdbreact'
import { addFriend } from '../../actions/userAuthActions'
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

export class UsersCard extends Component {
  componentDidMount() {
    // console.log(this.props);
  }
  constructor(props) {
    super(props)

    this.handleFriendRequest = this.handleFriendRequest.bind(this)
  }

  handleFriendRequest() {
    this.props.addFriend(this.props.auth.user._id)
  }
  render() {
    let { user, auth } = this.props
    // console.log(auth.);
    // console.log(user);

    return (
      // <MDBCol className='col-md-4 col-sm-12'>
      //   <MDBCard>
      //     <MDBCardImage
      //       style={{ width: '80px' }}
      //       className='img-fluid'
      //       src={user.profile_pic}
      //     />
      //     <MDBCardBody>
      //       <MDBCardTitle>{user.name}</MDBCardTitle>
      //       <NavLink to={`/profile/${user._id}`}>View</NavLink>
      //     </MDBCardBody>
      //   </MDBCard>
      // </MDBCol>
      <Col size='6' lg='3' style={{ marginBottom: '10px' }}>
        <Card>
          <CardImage
            className='img-fluid'
            src={user.profile_pic}
            waves
            style={{ marginLeft: '10px' }}
          />
          <CardBody style={{ textAlign: 'center' }}>
            <CardTitle>{user.name}</CardTitle>
            <hr />
            <NavLink to={`/profile/${user._id}`}>View</NavLink>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { addFriend })(UsersCard)
