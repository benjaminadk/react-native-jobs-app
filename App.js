import Expo, { Notifications } from 'expo'
import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './store'
import registerForNotifications from './services/push_notifications'
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import SettingsScreen from './screens/SettingsScreen'
import ReviewScreen from './screens/ReviewScreen'

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications()
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification

      if(origin === 'selected' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok' }]
        )
      }
    })
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      Welcome: WelcomeScreen,
      Auth: AuthScreen,
      Main: createBottomTabNavigator({
        Map: MapScreen,
        Deck: DeckScreen,
        Review: createStackNavigator({
          Review: ReviewScreen,
          Settings: SettingsScreen
        })
      }, {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state
            if(routeName === 'Review') {
              return(
                <Icon name='favorite' size={30} color={tintColor}/>
              )
            }
          }
        }),
        tabBarOptions: {
          labelStyle: {
            fontSize: 12
          }
        }
      })
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    })

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
