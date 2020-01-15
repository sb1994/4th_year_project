import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
export class Comment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { comment } = this.props;
    return (
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          <div className="row">
            <div className="col-md-6">
              <img
                src={this.props.comment.user.profile_pic}
                alt="Card image cap"
                style={style}
              />
              <span>{this.props.comment.user.name}</span>
            </div>
            <div className="col-md-6">
              <Moment className="text-right" fromNow>
                {this.props.comment.created}
              </Moment>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">{this.props.comment.text}</div>
          </div>
        </div>
      </div>
    );
  }
}
let style = {
  height: 30
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
