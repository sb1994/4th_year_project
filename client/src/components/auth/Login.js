import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAuth } from "../../actions/userAuthActions";
export class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    let email = e.target["email"].value;
    let password = e.target["password"].value;
    // console.log(e.target['username'].value);
    // console.log(username,password);
    this.props.loginAuth(email, password);
    // this.props.history.push("/register");
    console.log(this.props.auth);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
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

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginAuth }
)(Login);
