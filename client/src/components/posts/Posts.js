import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import Newsfeed from './Newsfeed'
// import Spinner from "../common/Spinner";
import { getPosts } from '../../actions/postActions'
import { withRouter } from 'react-router-dom'

class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // console.log()
    // console.log(this.props.feedId)
    console.log(this.props)
    this.props.getPosts(this.props.feedId)
  }

  render() {
    const { posts, loading } = this.props
    let postContent

    if (!posts || loading) {
      postContent = <h2>Loading....</h2>
    } else {
      // console.log(this.props.posts)
      postContent = <Newsfeed posts={posts} />
      // console.log(this.props);
    }
    // console.log(this.props);

    return (
      <div className='feed col-md-8'>
        <div className='row'>
          <div className='col-md-12'>
            <PostForm feedId={this.props.feedId} />
            {postContent}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { getPosts })(Posts))
