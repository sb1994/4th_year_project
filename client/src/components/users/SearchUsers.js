import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/searchActions";
import UserCard from "./UsersCard";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class SearchUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      username: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.search.users);
    this.setState({
      users: nextProps.search.users
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    let { users } = this.props.search;
    let { search } = this.state;

    let renderUsers;
    // console.log(users.length);
    if (users.length > 0) {
      renderUsers = users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      });
    }

    return (
      <MDBContainer>
        <h2>Search</h2>
        <p>{search}</p>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <MDBRow>{renderUsers}</MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  search: state.search
});

export default connect(
  mapStateToProps,
  { getUsers }
)(SearchUsers);
