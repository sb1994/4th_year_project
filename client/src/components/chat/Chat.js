import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }
  componentDidMount() {
    socket.on("connect", () => {
      // console.log(socket.id);
      // console.log("you are connected to the socket server");
      // socket.emit(
      //   "createMessage",
      //   {
      //     from: this.props.auth.user.id,
      //     text: "What is tgus"
      //   },
      //   message => {
      //     console.log("Server Got It", message);
      //   }
      // );
    });
    // socket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });
    socket.on("newMessage", message => {
      console.log("newMessage", message);
    });
  }
  onHandleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleMessageSubmit(e) {
    e.preventDefault();
    let { id } = this.props.auth.user;
    console.log(id);

    socket.emit("send message", { id, text: this.state.text });

    // socket.emit(
    //   "createMessage",
    //   {
    //     from: id,
    //     text: this.state.text
    //   },
    //   message => {
    //     console.log("Server Got It", message);
    //   }
    // );
  }
  render() {
    // console.log(this.props.auth.user);
    // console.log(socket.id);

    // let { user } = this.props.auth;

    return (
      <div>
        <h1>Chat</h1>
        <div className="row">
          <div className="col-md-12">
            <p className="text-muted">{this.state.text}</p>
          </div>
        </div>
        <form onSubmit={this.handleMessageSubmit} method="post">
          <div className="form-group">
            <input
              type="text"
              name="text"
              value={this.state.text}
              onChange={this.onHandleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
