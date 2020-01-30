import React, { Component } from "react";
import { connect } from "react-redux";

export class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.auth);
  }
  render() {
    return (
      <div>
        <h1>Friends</h1>
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
)(Friends);
