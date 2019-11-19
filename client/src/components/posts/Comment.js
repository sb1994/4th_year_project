import React, { Component } from "react";
import { connect } from "react-redux";

export class Comment extends Component {
  render() {
    return (
      <div>
        <h2>Comment</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
