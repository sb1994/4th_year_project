import React, { Component } from "react";
import { connect } from "react-redux";

export class UsersCard extends Component {
  render() {
    return (
      <div>
        <h4>User card</h4>
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
)(UsersCard);
