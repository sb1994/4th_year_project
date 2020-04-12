import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ConnectedListUser extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let { user } = this.props
    // console.log(this.props.user)

    return (
      <div className='col-md-2 col-sm-2 col-xs-6 card' style={styles.cardStyle}>
        <div className='card-body'>
          <img className='img-fluid' src={user.profile_pic} alt='' srcset='' />
          <p>{user.name}</p>
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
  cardStyle: {
    margin: 10
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedListUser)
