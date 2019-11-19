import React, { Component } from "react";
import { connect } from "react-redux";

export class FeedMap extends Component {
  render() {
    return (
      <div>
        <h2>FeedMap</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedMap);
