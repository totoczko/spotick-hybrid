import React, { Component } from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
  state = {
    placeName: ""
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim("") !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  }


  placeNameChangedHandler = val => {
    this.setState({
      placeName: val,
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeadingText>Share a place with us!</HeadingText>
          <PickImage />
          <PickLocation />
          <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
          <View style={styles.button}>
            <Button title="Share the place" onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 8
  }
})

export default connect(null, mapDispatchToProps)(SharePlaceScreen)