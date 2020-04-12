import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getSearchedUser } from '../../actions/userAuthActions'
import ProfileCard from './ProfileCard'
import Posts from '../posts/Posts'

export class Profile extends Component {
  componentDidMount() {
    // console.log(this.props);
    let { id } = this.props.match.params
    // console.log(id)

    this.props.getSearchedUser(id)
  }

  render() {
    let { searchedUser, user } = this.props.auth

    // console.log(user)

    let { id } = this.props.match.params

    if (!searchedUser) {
      return <div>Loading....</div>
    } else {
      return (
        <div className='container'>
          {/* <p>Profile</p> */}
          <div className='row'>
            <Fragment>
              <ProfileCard user={searchedUser} />
              <Posts feedId={id} />
            </Fragment>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getSearchedUser })(Profile)
