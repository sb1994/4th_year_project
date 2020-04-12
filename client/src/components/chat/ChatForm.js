import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ChatForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <div>ChatForm</div>
  }
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm)
