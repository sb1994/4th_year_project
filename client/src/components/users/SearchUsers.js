import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/searchActions";
import UserCard from "./UsersCard";

class SearchUsers extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    let { users } = this.props.search;
    let renderUsers;
    console.log(users.length);
    if (users.length > 0) {
      renderUsers = users.map(user => {
        return <UserCard key={user.id} user={user} />;
      });
    }

    return (
      <div className="feed">
        <div className="row">
          <h2>Search</h2>
          <div className="col-md-12">{renderUsers}</div>
        </div>
      </div>
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
