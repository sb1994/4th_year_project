import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
// //commpoents
import CurrentFriends from "./CurrentFriends";
import RequestedFriends from "./RequestedFriends";

//import the actions
import { getCurrentUser } from "../../actions/userAuthActions";
class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.auth.user.id);
    this.props.getCurrentUser();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    // console.log(this.props.auth);
    let { friends, pendingFriendsRequests } = this.props.auth.user;
    // console.log(this.props);

    return (
      <div>
        <h1>Friends</h1>
        <RequestedFriends requestedFriends={pendingFriendsRequests} />
        <CurrentFriends friends={friends} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { getCurrentUser }
  )(Friends)
);
