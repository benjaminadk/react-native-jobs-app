import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native' 
import { AppLoading } from 'expo'
import isNull from 'lodash/isNull'
import Slides from '../components/Slides'


const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03a9f4' },
  { text: 'Set your location, then swipe away', color: '#009688' },
  { text: 'Use this to get a JOB.', color: '#03a9f4' }
]

class WelcomeScreen extends Component {

  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token')
    if(token) {
      this.props.navigation.navigate('Map')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    if(isNull(this.state.token)) {
      return (<AppLoading/>)
    } 
    return(
      <Slides 
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    )
  }
}

export default WelcomeScreen