import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/searchActions";
import UserCard from "./UsersCard";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class SearchUsers extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    let { users } = this.props.search;
    let renderUsers;
    console.log(users.length);
    if (users.length > 0) {
      renderUsers = users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      });
    }

    return (
      <MDBContainer>
        <h2>Search</h2>
        <MDBRow>{renderUsers}</MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  search: state.search
});

export default connect(mapStateToProps, { getUsers })(SearchUsers);
