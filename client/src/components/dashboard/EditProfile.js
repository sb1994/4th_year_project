import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser, updateUser } from '../../actions/userAuthActions'
import { storage } from '../../firebase'
import { withRouter } from 'react-router-dom'
class EditProfile extends Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }
  constructor(props) {
    super(props)
    this.state = {
      // company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      profile_pic: null,
      profileImgURL: ''
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }
  // componentWillMount() {
  //   this.props.getCurrentUser()
  //   // console.log(bio)
  // }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.auth.user)
    let {
      bio,
      website,
      location,
      status,
      skills,
      githubusername,
      profile_pic
    } = nextProps.auth.user

    this.setState({
      bio,
      website,
      location,
      status,
      skills,
      githubusername,
      profile_pic,
      current_profile_pic: profile_pic
    })
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const profile_pic = e.target.files[0]
      this.setState({
        profile_pic,
        profileImgURL: URL.createObjectURL(profile_pic)
      })
    }
  }
  onSubmit = e => {
    e.preventDefault()
    console.log(this.state)

    if (this.state.profile_pic === this.state.current_profile_pic) {
      console.log('Will keep the same profile image')
      let {
        bio,
        website,
        location,
        status,
        skills,
        githubusername,
        profile_pic
      } = this.state

      let updatedUser = {
        bio,
        website,
        location,
        status,
        skills,
        githubusername,
        profile_pic
      }
      // const newPost = {
      //   text: this.state.text,
      //   postImgUrl: ''
      // }
      // console.log(newPost)
      this.props.updateUser(updatedUser)
      this.props.history.push('/dashboard')
    }
    // else {
    //   // const newPost = {
    //   //   text: this.state.text,
    //   //   post_pic: this.state.post_pic,
    //   //   postImgUrl: ''
    //   // }
    //   // console.log(newPost.post_pic)
    //   // const uploadTask = storage
    //   //   .ref(`post_imgs/${newPost.post_pic.name}`)
    //   //   .put(newPost.post_pic)
    //   // uploadTask.on(
    //   //   'state_changed',
    //   //   snapshot => {
    //   //     console.log(snapshot)
    //   //   },
    //   //   error => {
    //   //     console.log(error)
    //   //   },
    //   //   () => {
    //   //     console.log('IMAGE UPLOADED')
    //   //     //what happens whent the postIm has finished uploading
    //   //     storage
    //   //       .ref('post_imgs')
    //   //       .child(newPost.post_pic.name)
    //   //       .getDownloadURL()
    //   //       .then(url => {
    //   //         let postImgURL = url
    //   //         // console.log(postImgUrl);
    //   //         // console.log(postImgUrl);
    //   //         newPost.postImgURL = postImgURL
    //   //         // console.log(newPost);
    //   //         this.props.addPost(newPost)
    //   //         console.log(this.state)
    //   //         this.setState({
    //   //           text: '',
    //   //           post_pic: null,
    //   //           profileImgUrl: '',
    //   //           profileImgURL: ''
    //   //         })
    //   //       })
    //   //       .catch(err => {
    //   //         console.log(err)
    //   //       })
    //   //   }
    //   // )
    // }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }
  componentDidMount() {
    // if (
    //   !this.props.auth ||
    //   this.props.match.params.id !== this.props.auth.user.id
    // ) {
    //   this.props.history.push('/dashboard')
    // } else {
    //   console.log(this.props.auth.user)
    // }
  }
  render() {
    const { profileImgURL } = this.state
    let { user } = this.props.auth
    // console.log(this.state)

    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <span>Website</span>
            <input
              type='text'
              className='form-control'
              onChange={this.onChange}
              value={this.state.website}
              defaultValue={user.website}
              name='website'
            />
          </div>
          <div className='form-group'>
            <span>Location</span>
            <input
              type='text'
              className='form-control'
              onChange={this.onChange}
              value={this.state.location}
              name='location'
            />
          </div>
          <div className='form-group'>
            <span>Status</span>
            <input
              type='text'
              className='form-control'
              onChange={this.onChange}
              value={this.state.status}
              name='status'
            />
          </div>
          <div className='form-group'>
            <span>Bio:</span>
            <input
              type='text'
              className='form-control'
              onChange={this.onChange}
              value={this.state.bio}
              name='bio'
            />
          </div>
          <div className='form-group'>
            <span>Git Username</span>
            <input
              type='text'
              className='form-control'
              onChange={this.onChange}
              value={this.state.githubusername}
              name='githubusername'
            />
          </div>
          <div className='form-group'>
            <img
              src={profileImgURL}
              className='img-responsive card-img'
              alt=''
            />
            <input
              type='file'
              onChange={this.handleFileChange}
              // value={this.state.profile_pic}
              name='profile_pic'
              id='profile_pic'
            />
          </div>
          <button type='submit'>Update profile</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { getCurrentUser, updateUser })(EditProfile)
)
