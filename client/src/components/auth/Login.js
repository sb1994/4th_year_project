import React, { Component } from "react";
import { Link } from "react-router-dom";
import { usePosition } from "use-position";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = e.target["password"].value;
    // console.log(e.target['username'].value);
    console.log(username, password);
    this.props.onAuthLogin(username, password);
    // this.props.history.push('/movies')
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        user: position.coords
      });
    });
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              name="username"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your username with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {" "}
              Login{" "}
            </button>
            <Link to="/register">Signup</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
