import React, { Component } from "react";
import { connect } from "react-redux";

export class CommentForm extends Component {
  componentDidMount() {
    console.log(this.props.post_id);
  }
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-md-12">
        <h2>Comment Form</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
