import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
// import axios from "axios";
import setUserToken from './utils/setUserToken'

import jwt_decode from 'jwt-decode'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import store from './store'
import { setLoggedUser, logoutUser } from './actions/userAuthActions'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import NavBar from './components/Navbar'
import Friends from './components/friends/Friends'
import Chat from './components/chat/Chat'
import Profile from './components/dashboard/Profile'
import Dashboard from './components/dashboard/Dashboard'
import EditProfile from './components/dashboard/EditProfile'
import SearchUsers from './components/users/SearchUsers'
if (localStorage.token) {
  // console.log(localStorage.token);
  setUserToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  // console.log(decoded);

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded))

  // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current Profile
  //   store.dispatch(clearCurrentUser());
  //   // Redirect to login
  //   // window.location.href = '/login';
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <NavBar />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/profile/edit/:id' component={EditProfile} />
              <Route exact path='/search' component={SearchUsers} />
              <Route exact path='/chat' component={Chat} />
              <Route exact path='/friends' component={Friends} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App
