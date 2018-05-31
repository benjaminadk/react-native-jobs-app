import React, { Component } from 'react'
import { View, Text, Platform, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SettingsScreen extends Component {

  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  deleteFacebookToken = () => AsyncStorage.removeItem('fb_token')

  render() {
    return(
      <View>
      <Button
          title='Clear Async Storage'
          large
          buttonStyle={styles.button}
          backgroundColor='#f72a2a'
          icon={{ name: 'delete-forever' }}
          onPress={this.deleteFacebookToken}
      />
      <Button
        title='Clear Liked Jobs'
        large
        buttonStyle={styles.button}
        backgroundColor='#f72a2a'
        icon={{ name: 'delete-forever' }}
        onPress={this.props.clearLikedJobs}
      />
      </View>
    )
  }
}

const styles = {
  button: {
    marginTop: 10
  }
}

export default connect(null, actions)(SettingsScreen)