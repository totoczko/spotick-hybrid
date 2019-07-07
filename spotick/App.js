/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @PlaceInputat
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList';
// import placeImage from './src/assets/lagoon.jpg'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          // image: placeImage,
          image: {
            uri: "https://139992-434456-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/03/Fiji-Travel-Network-Blue-Lagoon-Beachfront2.jpg"
          }
        })
      }
    })
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    })
  }

  onItemDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    })
  }

  onModalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.onItemDeletedHandler}
          onModalClosed={this.onModalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
