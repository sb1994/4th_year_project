import React, { Component } from "react";
import { connect } from "react-redux";
import RequestedFriendCard from "./RequestedFriendCard";

export class RequestedFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    this.setState({
      requests: this.props.requestedFriends
    });
  }
  render() {
    let { pendingFriendsRequests } = this.props.auth.user;
    console.log(pendingFriendsRequests);
    console.log(this.props.auth.user.pendingFriendsRequests);

    let renderRequests;
    if (pendingFriendsRequests && pendingFriendsRequests.length > 0) {
      renderRequests = pendingFriendsRequests.map(request => (
        <RequestedFriendCard key={request._id} request={request} />
      ));
    } else {
      return <div>You have no pending friend requests</div>;
    }
    return (
      <div>
        <h2>Requested Friends</h2>
        {renderRequests}
      </div>
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
)(RequestedFriends);
