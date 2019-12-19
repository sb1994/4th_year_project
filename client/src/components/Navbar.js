import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  MDBNav as Nav,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBCol,
  MDBRow
} from "mdbreact";
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
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink className="white-text" to="/dashboard">
            <MDBRow className="mb-2 sm-2">
              <MDBCol md="4" sm="2">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  Logout
                </a>
                <img
                  src={user.profile_pic}
                  className="img-fluid"
                  style={styles.img}
                />
              </MDBCol>
            </MDBRow>
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

export default connect(mapStateToProps, { logoutUser })(Navbar);
