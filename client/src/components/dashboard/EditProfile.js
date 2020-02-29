import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/userAuthActions'
import { storage } from '../../firebase'
class EditProfile extends Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }
  constructor(props) {
    super(props)

    let { user } = this.props.auth
    this.state = {
      company: '',
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
    this.onSubmit = this.onSubmit.bind(this)
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
  onSubmit(e) {
    e.preventDefault()
    console.log('LOL')
    if (this.state.post_pic === null && this.state.text !== '') {
      console.log('Will post text not image')
      const newPost = {
        text: this.state.text,
        postImgUrl: ''
      }
      console.log(newPost)
      this.props.addPost(newPost)
      this.setState({
        text: ''
      })
    } else {
      const newPost = {
        text: this.state.text,
        post_pic: this.state.post_pic,
        postImgUrl: ''
      }
      console.log(newPost.post_pic)

      const uploadTask = storage
        .ref(`post_imgs/${newPost.post_pic.name}`)
        .put(newPost.post_pic)
      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log(snapshot)
        },
        error => {
          console.log(error)
        },
        () => {
          console.log('IMAGE UPLOADED')
          //what happens whent the postIm has finished uploading
          storage
            .ref('post_imgs')
            .child(newPost.post_pic.name)
            .getDownloadURL()
            .then(url => {
              let postImgURL = url
              // console.log(postImgUrl);

              // console.log(postImgUrl);
              newPost.postImgURL = postImgURL
              // console.log(newPost);
              this.props.addPost(newPost)
              console.log(this.state)

              this.setState({
                text: '',
                post_pic: null,
                profileImgUrl: '',
                profileImgURL: ''
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      )
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }
  componentDidMount() {
    if (
      !this.props.auth ||
      this.props.match.params.id !== this.props.auth.user.id
    ) {
      this.props.history.push('/dashboard')
    }
  }
  render() {
    const { profileImgURL } = this.state
    let { user } = this.props.auth

    return (
      <div>
        <h1>Edit Profile Page</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <span>Commpany</span>
            <input
              type='text'
              onChange={this.onChange}
              value={user.company}
              name='company'
            />
          </div>
          <div className='form-group'>
            <span>Website</span>
            <input
              type='text'
              onChange={this.onChange}
              value={user.website}
              name='website'
            />
          </div>
          <div className='form-group'>
            <span>Location</span>
            <input
              type='text'
              onChange={this.onChange}
              value={user.location}
              name='location'
            />
          </div>
          <div className='form-group'>
            <span>Status</span>
            <input type='text' onChange={this.onChange} value={user.status} />
          </div>
          <div className='form-group'>
            <input type='text' onChange={this.onChange} value={user.bio} />
          </div>
          <div className='form-group'>
            <input
              type='text'
              onChange={this.onChange}
              value={user.githubusername}
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
              value={this.state.profile_pic}
              name='avatar'
              id='avatar'
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

export default connect(mapStateToProps, { getCurrentUser })(EditProfile)
