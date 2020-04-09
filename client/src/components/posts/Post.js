import React, { Component } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
//user reder actions
import { deletePost } from '../../actions/postActions'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
export class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: false
    }
    this.showComments = this.showComments.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  componentDidMount() {
    // console.log(this.props.post);
  }
  showComments() {
    if (this.state.showComments) {
      this.setState({
        showComments: false
      })
    } else {
      this.setState({
        showComments: true
      })
    }
  }
  deletePost() {
    let { post, auth } = this.props
    this.props.deletePost(post._id, post.feedId)
  }
  render() {
    const { showComments } = this.state
    let { user, isAuthenticated } = this.props.auth
    let { post } = this.props
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            <div className='row'>
              <div className='col-md-6'>
                <img
                  src={post.user.profile_pic}
                  alt='Card image cap'
                  style={style}
                />
                <span>{post.user.name}</span>
              </div>
              <div className='col-md-6'>
                <Moment className='text-right' format='YYYY/MM/DD'>
                  {post.created}
                </Moment>
                {user._id === post.feedId ? (
                  <button className='btn btn-danger' onClick={this.deletePost}>
                    X
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12'>{post.text}</div>
              <div className='col-md-12'>
                {post.postImgURL !== undefined ? (
                  <img
                    className='img-fluid'
                    src={post.postImgURL}
                    alt='Post Image'
                  />
                ) : (
                  ''
                )}
              </div>
              <hr />
              <div className='col-md-12'>
                <button className='btn btn-primary' onClick={this.showComments}>
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
              </div>
              <div className='col-md-12'>
                <hr />
                {showComments ? (
                  <div className='row'>
                    {isAuthenticated ? (
                      <CommentForm post_id={post._id} />
                    ) : (
                      <p>Please Login</p>
                    )}
                    <CommentList
                      post={post}
                      comments={post.comments}
                      feedId={post.feedId}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let style = {
  height: 30
}
const mapStateToProps = state => ({
  auth: state.auth
  // profile: state.auth
  // post: state.posts
})
export default connect(mapStateToProps, { deletePost })(Post)
