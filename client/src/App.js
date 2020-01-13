import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
// import axios from "axios";
import setUserToken from "./utils/setUserToken";

import jwt_decode from "jwt-decode";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import store from "./store";
import { setLoggedUser, logoutUser } from "./actions/userAuthActions";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavBar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import { SearchUsers } from "./components/users/SearchUsers";
if (localStorage.token) {
  // console.log(localStorage.token);
  setUserToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  // console.log(decoded);

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded));

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
            <div className="container">
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/search" component={SearchUsers} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
