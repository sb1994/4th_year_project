import React, { Component, Fragment } from 'react'
// import HEREMap from "react-here-maps";
import { connect } from 'react-redux'
import Posts from '../posts/Posts'
import ProfileCard from './ProfileCard'
import { withRouter } from 'react-router-dom'
import { getCurrentUser } from '../../actions/userAuthActions'
import { getPosts } from '../../actions/postActions'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '0,0', // Null Island
      error: null,
      feedId: ''
    }
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    } else {
      this.props.getCurrentUser()
      // this.props.getPosts(this.props.auth.user._id)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    } else {
    }

    if (nextProps.auth.user._id) {
      // this.setState({ errors: nextProps.errors })
      this.setState({ feedId: nextProps.auth.user._id })
    }
  }
  render() {
    // console.log(this.props);
    const { user } = this.props.auth
    const { profile, history } = this.props
    // console.log(user._id)
    // console.log(this.state)

    // console.log(this.state.feedId)

    // console.log(history)/

    // console.log(user._id)
    if (this.state.feedId !== '') {
      console.log(this.state.feedId)

      return (
        <div className='container'>
          <div className='row'>
            <ProfileCard user={user} history={history} />
            <Posts feedId={this.state.feedId} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className='row'>
            <p>Loading ....</p>
          </div>
        </div>
      )
    }
  }
}
const style = {
  profile: {
    height: 500
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.auth
  // post: state.posts
})

export default withRouter(
  connect(mapStateToProps, { getCurrentUser, getPosts })(Dashboard)
)
