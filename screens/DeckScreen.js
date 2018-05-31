import React, { Component } from 'react'
import { View, Text, Platform, Dimensions } from 'react-native'
import { MapView } from 'expo'
import { Card, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Swipe from '../components/Swipe'

const SCREEN_HEIGHT = Dimensions.get('window').height

class DeckScreen extends Component {

  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return(
        <Icon name='description' size={30} color={tintColor}/>
      )
    }
  }

  renderCard = job => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02 
    }
    return(
      <Card title={job.jobtitle}>
        <View style={{ height: SCREEN_HEIGHT * 0.33 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <View style={{ height: SCREEN_HEIGHT * 0.18 }}>
          <Text style={{ textAlign: 'justify' }}>
            {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
          </Text>
        </View>
      </Card>
    )
  }

  renderNoMoreCards = () => {
    return(
      <Card title='No more jobs'>
        <Button
          title='Back To Map'
          large
          icon={{ name: 'my-location' }}
          backgroundColor='#03a9f4'
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    )
  }

  render() {
    return(
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp='jobkey'
        />
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 10
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results }
}

export default connect(mapStateToProps, actions)(DeckScreen)