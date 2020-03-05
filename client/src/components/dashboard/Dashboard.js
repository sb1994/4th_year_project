import React, { Component, Fragment } from 'react'
// import HEREMap from "react-here-maps";
import { connect } from 'react-redux'
import Posts from '../posts/Posts'
import ProfileCard from './ProfileCard'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '0,0', // Null Island
      error: null
    }
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    // console.log(this.props);
    const { user } = this.props.auth
    const { profile } = this.props
    // console.log(user)

    const center = {
      lat: 51.5,
      lng: 0
    }
    return (
      <Fragment>
        <h1>Dashboard</h1>
        <div className='row'>
          <ProfileCard user={user} />
        </div>
      </Fragment>
    )
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

export default connect(
  mapStateToProps
  // { getPosts }
)(Dashboard)
