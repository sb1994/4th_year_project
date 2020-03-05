import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchedUser } from "../../actions/userAuthActions";
import ProfileCard from './ProfileCard'
import Posts from '../posts/Posts'

export class Profile extends Component {
  componentDidMount() {
    // console.log(this.props);
    let { id } = this.props.match.params
    console.log(id);


    this.props.getSearchedUser(id)
  }

  render() {
    let user = this.props.auth.searchedUser
    let { id } = this.props.match.params
    return (
      <div>
        {/* <p>Profile</p> */}
        <div className="row">

          <ProfileCard user={user} />
          <Posts feedId={id} />

        </div>
        <div className="row">
          <div className="col-md-12">

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getSearchedUser })(Profile)
