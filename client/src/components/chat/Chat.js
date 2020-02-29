import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import ConnectedList from '../dashboard/ConnectedList'
// const socket = io('http://localhost:5000')
export class Chat extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      // console.log(this.props.getPosts());
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  render() {
    // console.log(this.props.auth.user);
    // console.log(socket.id);

    // let { user } = this.props.auth;

    return (
      <div>
        <h1>Chat</h1>
        <div className='col-md-4'>
          <ConnectedList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
