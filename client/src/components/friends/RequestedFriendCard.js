import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBBtn as Button,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";
import { acceptFriendRequest } from "../../actions/userAuthActions";
export class RequestedFriendCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleAcceptFriendRequest = this.handleAcceptFriendRequest.bind(this);
  }
  handleAcceptFriendRequest() {
    // console.log(this.props.request.user._id, this.props.auth.user.id);
    this.props.acceptFriendRequest(this.props.request.user._id);
  }
  render() {
    // console.log(this.props.request.user);
    let { request, auth } = this.props;
    console.log(request);

    return (
      <div>
        <h3>Requested Friend Card</h3>
        <MDBCol size="2">
          <MDBCard>
            <MDBCardImage
              style={{ width: "50px" }}
              className="img-fluid"
              src={request.user.profile_pic}
            />
            <MDBCardBody>
              <MDBCardTitle>{request.user.name}</MDBCardTitle>
              {// isA
              request.status === "requested" &&
              request.user._id !== auth.user.id ? (
                <Button onClick={this.handleAcceptFriendRequest} color="blue">
                  Accept
                </Button>
              ) : (
                ""
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { acceptFriendRequest })(
  RequestedFriendCard
);
