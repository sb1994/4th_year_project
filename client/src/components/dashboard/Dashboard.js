import React, { Component, Fragment } from 'react'
// import HEREMap from "react-here-maps";
import { connect } from 'react-redux'
import PostForm from '../posts/PostForm'
import ConnectedList from './ConnectedList'
import Posts from '../posts/Posts'
import { getPosts } from '../../actions/postActions'

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
    } else {
      // console.log(this.props.getPosts());
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
          <div className='col-md-2 card' style={style.profile}>
            <div className='card-body'>
              <h2 className='card-title'>{user.name}</h2>
              <img
                src={user.profile_pic}
                alt='Profile Pic'
                className='img-fluid'
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-12'>
                {/* <PostForm /> */}
                <Posts />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <ConnectedList />
          </div>
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
