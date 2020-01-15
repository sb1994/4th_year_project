import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import {
  MDBBtn as Button,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";

export class UsersCard extends Component {
  componentDidMount() {
    // console.log(this.props);
  }
  constructor(props) {
    super(props);

    this.state = {};
    this.handleFriendRequest = this.handleFriendRequest.bind(this);
  }

  handleFriendRequest() {
    console.log(`Hello from ${this.props.user._id}`);
  }
  render() {
    let { user } = this.props;
    return (
      <MDBCol size="2">
        <MDBCard>
          <MDBCardImage
            style={{ width: "80px" }}
            className="img-fluid"
            src={user.profile_pic}
          />
          <MDBCardBody>
            <MDBCardTitle>
              <h4>{user.name}</h4>
            </MDBCardTitle>
            <Button onClick={this.handleFriendRequest} color="blue">
              Add
            </Button>
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
  mapDispatchToProps
)(UsersCard);
