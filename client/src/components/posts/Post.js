import React, { Component } from "react";
import Moment from "react-moment";
export class Post extends Component {
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={this.props.post.user.profile_pic}
                  alt="Card image cap"
                  style={style}
                />
                <span>{this.props.post.user.name}</span>
              </div>
              <div className="col-md-6">
                <Moment className="text-right" format="YYYY/MM/DD">
                  {this.props.post.created}
                </Moment>
              </div>
            </div>
          </div>
          <div className="card-body">{this.props.post.text}</div>
        </div>
      </div>
    );
  }
}

let style = {
  height: 30
};
export default Post;
