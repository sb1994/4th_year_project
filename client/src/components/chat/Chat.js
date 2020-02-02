import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
export class Chat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }
  render() {
    console.log(this.props.auth.user);
    console.log(socket.id);

    let { user } = this.props.auth;

    return (
      <div>
        <h1>Chat</h1>
        <p>{user.name}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
