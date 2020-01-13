import React, { Component } from "react";
import { connect } from "react-redux";

export class SearchUsers extends Component {
  render() {
    return (
      <div>
        <h1>Search Users</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsers);
