import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </nav>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
