import React, { Component } from "react";
import { connect } from "react-redux";

class CurrentFriends extends Component {
  render() {
    return (
      <div>
        <h2>Current Friends</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentFriends);
