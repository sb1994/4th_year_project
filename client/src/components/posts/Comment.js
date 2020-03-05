import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/postActions";
export class Comment extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this)
  }
  deleteComment() {
    let { post, auth, feedId, comment } = this.props
    // console.log(this.props);
    // console.log(post);


    this.props.deleteComment(comment._id, comment.post)

  }
  render() {
    let { comment } = this.props;
    console.log(this.props);

    let { user, isAuthenticated } = this.props.auth
    let { feedId } = this.props
    return (
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          <div className="row">
            <div className="col-md-6">
              <img
                src={comment.user.profile_pic}
                alt="Card image cap"
                style={style}
              />
              <span>{comment.user.name}</span>
            </div>
            <div className="col-md-6">
              <Moment className="text-right" fromNow>
                {comment.created}
              </Moment>
              {
                user.id === feedId ? <button className="btn btn-danger" onClick={this.deleteComment}>X</button> : ''
              }
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">{comment.text}</div>
          </div>
        </div>
      </div>
    );
  }
}
let style = {
  height: 30
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { deleteComment })(Comment);
