import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'

class AuthScreen extends Component {

  componentDidMount() {
    this.props.facebookLogin()
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete = props => {
    if(props.token) {
      this.props.navigation.navigate('Map')
    }
  }

  render() {
    return(
      <View/>
    )
  }
}

function mapStateToProps({ auth: { token }}) {
  return { token }
}

export default connect(mapStateToProps, actions)(AuthScreen)