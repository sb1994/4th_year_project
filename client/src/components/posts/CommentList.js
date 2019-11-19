import React, { Component } from "react";
import { connect } from "react-redux";

export class CommentList extends Component {
  render() {
    return (
      <div>
        <h2>CommentList</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);
