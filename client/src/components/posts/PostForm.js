import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      latitude: "",
      longitude: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    // e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position.coords);
        const newPost = {
          text: this.state.text,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        // console.log(newPost);

        this.props.addPost(newPost);
        this.setState({
          text: "",
          latitude: "",
          longitude: ""
        });
      });
    } else {
      console.log("were fucked");
    }
    // const { user } = this.props.auth;

    //  this.props.addPost(newPost);
    //  this.setState({ text: "" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-form mb-3">
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
                placeholder="Speack your mind"
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

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
