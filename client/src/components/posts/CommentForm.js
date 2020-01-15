import React, { Component } from "react";
import { connect } from "react-redux";

import { addComment } from "../../actions/postActions";
export class CommentForm extends Component {
  componentDidMount() {
    // console.log(this.props.post_id);
  }
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post_id,
      text: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    let { post, text } = this.state;
    e.preventDefault();
    // console.log(this.state);
    if (text == "") {
      alert("Please insert text indasd the comment box");
    } else {
      let newComment = {
        post,
        text
      };
      this.props.addComment(newComment);
      this.setState({
        text: ""
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="comment-form col-md-12">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something....
          </div>
          <div className="card-body">
            {/* <form onSubmit={this.onSubmit}> */}
            <div className="form-group">
              <input
                type="text"
                value={this.state.text}
                placeholder="Enter comment"
                onChange={this.onChange}
                name="text"
              />
            </div>
            <button className="btn btn-dark" onClick={this.onSubmit}>
              Submit
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);
