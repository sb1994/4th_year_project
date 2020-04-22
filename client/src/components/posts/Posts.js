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

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // console.log()
    // console.log(this.props.feedId)
    this.props.getPosts(this.props.feedId)
    // console.log(this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.posts.posts)
    if (nextProps.posts.posts.length > 0 || nextProps.posts.posts !== null) {
      console.log('posts loaded')
      this.setState({ loading: false })
    }
  }

  render() {
    const { posts } = this.props
    let { loading } = this.state

    let postContent

    if (loading) {
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
