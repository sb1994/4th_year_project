import React, { Component } from 'react'
import Moment from 'react-moment'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
export class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: false
    }
    this.showComments = this.showComments.bind(this)
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
  render() {
    const { showComments } = this.state
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            <div className='row'>
              <div className='col-md-6'>
                <img
                  src={this.props.post.user.profile_pic}
                  alt='Card image cap'
                  style={style}
                />
                <span>{this.props.post.user.name}</span>
              </div>
              <div className='col-md-6'>
                <Moment className='text-right' format='YYYY/MM/DD'>
                  {this.props.post.created}
                </Moment>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12'>{this.props.post.text}</div>
              <div className='col-md-12'>
                {this.props.post.postImgURL === undefined ? (
                  ''
                ) : (
                  <img
                    className='img-fluid'
                    src={this.props.post.postImgURL}
                    alt='Post Image'
                  />
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
                    <CommentForm post_id={this.props.post._id} />
                    <CommentList comments={this.props.post.comments} />
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
export default Post
