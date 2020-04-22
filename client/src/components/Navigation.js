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
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer
} from 'mdbreact'
import { withRouter } from 'react-router-dom'
import { setLoggedUser, logoutUser } from '../actions/userAuthActions'
const styles = {
  img: {
    height: 20,
    width: 30
  }
}
class Navigation extends Component {
  state = {
    collapseID: ''
  }
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
    // window.location.push('/login')
    // this.props.history.push("/login");
    // console.log(this.props);
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }))
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    // const authLinks = (
    //   <Fragment>
    //     <NavItem>
    //       <NavLink className='white-text' to='/dashboard'>
    //         <img
    //           src={user.profile_pic}
    //           className='img-fluid'
    //           style={styles.img}
    //         />
    //       </NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink to='/search' className='white-text'>
    //         Search
    //       </NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink to='/chat' className='white-text'>
    //         Chat
    //       </NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink to='/friends' className='white-text'>
    //         friends
    //       </NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink
    //         to=''
    //         onClick={this.onLogoutClick.bind(this)}
    //         className='white-text'
    //       >
    //         Logout
    //       </NavLink>
    //     </NavItem>
    //   </Fragment>
    // )
    // const unAuthLinks = (
    //   <Fragment>
    //     <NavItem>
    //       <NavLink className='white-text' to='/login'>
    //         Login
    //       </NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink className='white-text' to='/register'>
    //         Register
    //       </NavLink>
    //     </NavItem>
    //   </Fragment>
    // )
    // return <MNavbar>{isAuthenticated ? authLinks : unAuthLinks}</MNavbar>
    return (
      <MDBNavbar bg='light' expand='lg' color='light-blue lighten-4'>
        {/* <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand> */}

        {/* <Na>Navbar</MDBNavbarBrand> */}
        <MDBNavbarToggler
          aria
          onClick={this.toggleCollapse('navbarCollapse1')}
          icon='bars'
        />
        <MDBCollapse id='navbarCollapse1' isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to='#!'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to='#!'>Link</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to='#!'>Profile</MDBNavLink>
            </MDBNavItem>
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
