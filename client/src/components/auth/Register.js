import React, { Component } from "react";
// // import axios from "axios";
// import { storage } from "../../firebase";
import { connect } from "react-redux";
import { registerAuth } from "../../actions/userAuthActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: {},
      avatarURL: "",
      progress: 0,
      email: "",
      password: "",
      username: "",
      bio: "",
      fav_quote: "",
      name: ""
    };
    // this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleFileChange = e => {
  //   if (e.target.files[0]) {
  //     const avatar = e.target.files[0];
  //     this.setState({
  //       avatar,
  //       avatarURL: URL.createObjectURL(avatar)
  //     });
  //   }
  // };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    // console.log("hello");
    // console.log(this.state);

    let {
      // username,
      email,
      password,
      // avatar,
      // bio,
      // fav_quote,
      name
    } = this.state;

    const registerData = {
      password,
      email,
      name
    };
    // console.log(registerData);
    this.props.registerAuth(
      registerData.password,
      registerData.name,
      registerData.email
    );
    this.props.history.push("/login");
    // const uploadTask = storage
    //   .ref(`avatar/${registerData.avatar.name}`)
    //   .put(avatar);
    // uploadTask.on(
    //   "state_changed",
    //   snapshot => {
    //     console.log(snapshot);
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     console.log("IMAGE UPLOADED");

    //     //what happens whent the avatar has finished uploading

    //     storage
    //       .ref("avatar")
    //       .child(avatar.name)
    //       .getDownloadURL()
    //       .then(url => {
    //         let avatar = url;
    //         this.props.registerAuth(
    //           registerData.username,
    //           registerData.password,
    //           avatar,
    //           registerData.email,
    //           registerData.name,
    //           registerData.bio,
    //           registerData.fav_quote
    //         );
    //         this.props.history.push("/movies");
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };
  render() {
    // const { avatarURL } = this.state;
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              onChange={this.handleInputChange}
              name="email"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.handleInputChange}
              name="password"
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Name"
              onChange={this.handleInputChange}
              name="name"
              value={this.state.name}
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { registerAuth }
)(Register);
