import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { addFriend } from "../../actions/userAuthActions";
import {
  MDBBtn as Button,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

export class CurrentFriendCard extends Component {
  componentDidMount() {
    // console.log(this.props);
  }
  constructor(props) {
    super(props);

    this.handleFriendRequest = this.handleFriendRequest.bind(this);
  }

  handleFriendRequest() {
    this.props.addFriend(this.props.user._id);
  }
  render() {
    let { user, auth } = this.props;
    // console.log(auth.);
    // console.log(user);

    return (
      <MDBCol size="3">
        <MDBCard>
          <MDBCardImage
            style={{ width: "80px" }}
            className="img-fluid"
            src={user.profile_pic}
          />
          <MDBCardBody>
            <MDBCardTitle>{user.name}</MDBCardTitle>
            {/* {// isA
            auth.isAuthenticated && user._id === auth.user.id ? (
              <Button onClick={this.handleFriendRequest} color="blue">
                Add
              </Button>
            ) : (
              ""
            )} */}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  { addFriend }
)(CurrentFriendCard);
