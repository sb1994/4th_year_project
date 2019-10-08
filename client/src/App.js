import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.get("/api/users/test").then(result => {
      console.log(result.data.msg);
    });
  }
  render() {
    return (
      <div className="container">
        <h1>React App</h1>
      </div>
    );
  }
}
export default App;
