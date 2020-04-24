import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import {
//   MDBNav as Nav,
//   MDBNavItem as NavItem,
//   MDBNavLink as NavLink,
//   MDBNavbar as Navbar,
//   MDBCol,
//   MDBRow
// } from 'mdbreact'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem as NavItem,
  MDBNavLink as NavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact'
import { withRouter } from 'react-router-dom'
import { setLoggedUser, logoutUser } from '../actions/userAuthActions'
import './nav_style.css'
const styles = {
  img: {
    height: 20,
    width: 30
  }
}
class Navigation extends Component {
  state = {
    isOpen: false
  }
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
    // window.location.push('/login')
    // this.props.history.push("/login");
    // console.log(this.props);
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink className='white-text' to='/dashboard'>
            <img
              src={user.profile_pic}
              className='img-fluid'
              style={styles.img}
            />
            <span>{user.name}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/search' className='white-text'>
            Search
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/chat' className='white-text'>
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to=''
            onClick={this.onLogoutClick.bind(this)}
            className='white-text'
          >
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    )
    const unAuthLinks = (
      <Fragment>
        <NavItem>
          <NavLink className='white-text' to='/'>
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className='white-text' to='/register'>
            Register
          </NavLink>
        </NavItem>
      </Fragment>
    )
    // return <MNavbar>{isAuthenticated ? authLinks : unAuthLinks}</MNavbar>
    return (
      <MDBNavbar className='navbar' dark expand='md'>
        <MDBNavbarBrand>
          <strong className='white-text'>Social App</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            {isAuthenticated ? authLinks : unAuthLinks}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation))
