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
      users: [],
      term: "",
      totalResults: 0,
      totalPages: 0,
      totalPerPage: 0,
      currentPageNo: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.search.users);
    this.setState({
      users: nextProps.search.users,
      totalUsers: nextProps.search.users.length
    });
  }

  nextPage(pageNumber) {}
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    let { term, users } = this.state;
    //returns the user if the index of the search state is not  === -1
    let fileredUsers = this.props.search.users.filter(user => {
      return user.name.toLowerCase().includes(term);
    });
    // let   = users
    // console.log(this.state);

    let renderUsers;
    // // console.log(users.length);

    renderUsers = fileredUsers.map((user, index) => (
      <UserCard key={index} user={user} />
    ));

    return (
      <MDBContainer>
        <h2>Search</h2>
        <p>{term}</p>
        <input
          type="text"
          name="term"
          value={this.state.term}
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
