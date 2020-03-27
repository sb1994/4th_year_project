import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
export class CommentList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // console.log(this.props.comments);
  }
  render() {
    let { comments, feedId } = this.props

    let commentContent = comments.map(comment => {
      return <Comment key={comment._id} comment={comment} feedId={feedId} />
    })
    return (
      <div className='col-md-12'>
        <h2>CommentList</h2>
        {commentContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
