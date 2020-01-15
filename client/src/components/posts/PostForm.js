import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import { storage } from "../../firebase";
import { isEmpty } from "lodash";

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      post_pic: null,
      postImgURL: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const post_pic = e.target.files[0];
      this.setState({
        post_pic,
        postImgURL: URL.createObjectURL(post_pic)
      });
    }
  }
  onSubmit(e) {
    console.log("LOL");
    if (this.state.post_pic === null && this.state.text !== "") {
      console.log("Will post text not image");
      const newPost = {
        text: this.state.text,
        postImgUrl: ""
      };
      console.log(newPost);
      this.props.addPost(newPost);
      this.setState({
        text: ""
      });
    } else {
      const newPost = {
        text: this.state.text,
        post_pic: this.state.post_pic,
        postImgUrl: ""
      };
      // console.log(newPost.post_pic);

      const uploadTask = storage
        .ref(`post_imgs/${newPost.post_pic.name}`)
        .put(newPost.post_pic);
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("IMAGE UPLOADED");
          //what happens whent the postIm has finished uploading
          storage
            .ref("post_imgs")
            .child(newPost.post_pic.name)
            .getDownloadURL()
            .then(url => {
              let postImgURL = url;
              // console.log(postImgUrl);

              // console.log(postImgUrl);
              newPost.postImgURL = postImgURL;
              // console.log(newPost);
              this.props.addPost(newPost);
              console.log(this.state);

              this.setState({
                text: "",
                post_pic: null,
                postImgUrl: "",
                postImgURL: ""
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      );
    }
    // console.log(this.state.post_pic);

    // if (!isEmpty(this.state.post_pic)) {

    // }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { postImgURL } = this.state;
    let postFormOutput;

    if (this.props.auth.isAuthenticated) {
      // console.log("I can post here");
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
              <div className="form-group">
                <img
                  src={postImgURL}
                  className="img-responsive card-img"
                  alt=""
                />
                <input
                  type="file"
                  value={this.state.profile_pic}
                  name="avatar"
                  id="avatar"
                  onChange={this.handleFileChange}
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
    } else {
      return (
        <div>
          <p>Please Login</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);
