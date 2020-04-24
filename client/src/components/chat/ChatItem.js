import React, { Component } from 'react'
import { connect } from 'react-redux'
import './chat.css'
import Moment from 'react-moment'
export class ChatItem extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let { msg, auth } = this.props

    return (
      <div className='col-md-12 chatItem' style={{ marginBottom: '10px' }}>
        <div className='row text-white'>
          {auth.user.id === msg.user._id ? (
            <div className='col-md-6' style={{ paddingBottom: '10px' }}></div>
          ) : null}
          <div
            className={`col-md-6 col-12 ${
              auth.user.id === msg.user._id ? ' msgAuthBg' : 'msgChatBg'
            }`}
          >
            <div className='row'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-6 col-7'>
                    <img
                      className={`img-fluid float-left`}
                      style={{ height: '50px' }}
                      src={msg.user.profile_pic}
                    />
                    <p>{msg.user.name}</p>
                  </div>
                  <hr />
                  <div className={`col-md-6 col-5`}>
                    <Moment
                      date={msg.created}
                      format='DD/MM/YYYY'
                      className='text-white'
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-12'>
                <p
                  className={`${
                    auth.user.id === msg.user._id ? ' msgAuth' : 'msgChat'
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}
const styles = {
  msgAuth: {
    backgroundColor: '#666'
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatItem)
