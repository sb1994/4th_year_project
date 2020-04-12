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
      <div className='col-md-12 '>
        <div className='row'>
          {auth.user.id === msg.user._id ? (
            <div className='col-md-6'></div>
          ) : null}
          <div className='col-md-6 '>
            <div className='row'>
              <div className='col-md-6'>
                <img
                  className={`img-fluid`}
                  style={{ height: '50px' }}
                  src={msg.user.profile_pic}
                />
              </div>
              <div className='col-md-6'>
                <Moment date={msg.created} format='YYYY/MM/DD' />
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
