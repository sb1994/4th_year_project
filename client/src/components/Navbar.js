import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  MDBNav as Nav,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBCol,
  MDBRow
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { setLoggedUser, logoutUser } from "../actions/userAuthActions";
const styles = {
  img: {
    height: 20,
    width: 30
  }
};
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    // this.props.history.push("/login");
    // console.log(this.props);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink className="white-text" to="/dashboard">
            <img
              src={user.profile_pic}
              className="img-fluid"
              style={styles.img}
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/search" className="white-text">
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/chat" className="white-text">
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/friends" className="white-text">
            Friends
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to=""
            onClick={this.onLogoutClick.bind(this)}
            className="white-text"
          >
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    );
    const unAuthLinks = (
      <Fragment>
        <NavItem>
          <NavLink className="white-text" to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="white-text" to="/register">
            Register
          </NavLink>
        </NavItem>
      </Fragment>
    );
    return (
      <Nav color="purple-gradient" className="justify-content-end">
        {isAuthenticated ? authLinks : unAuthLinks}
      </Nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar)
);
