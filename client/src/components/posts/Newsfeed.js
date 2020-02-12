import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import Post from './Post'
import { getPosts } from '../../actions/postActions'
export class Newsfeed extends Component {
  componentDidMount() {
    // console.log();
    // console.log(this.props.post);
    // this.props.getPosts();
    // console.log("hello world");
  }

  render() {
    let { posts } = this.props.posts
    // console.log(posts);

    let newsFeedContent = posts.map(post => {
      return <Post key={post._id} post={post} />
    })
    // console.log(this.props);

    return (
      <div>
        <h2>NewsFeed</h2>
        {newsFeedContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Newsfeed)
