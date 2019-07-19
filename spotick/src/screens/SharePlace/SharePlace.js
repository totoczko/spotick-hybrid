import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false
      }
    }
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
    if (this.state.controls.placeName.value.trim("") !== "") {
      this.props.onAddPlace(this.state.controls.placeName.value);
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            touched: true,
            valid: validate(val, prevState.controls.placeName.validationRules)
          }
        }
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the place"
              onPress={this.placeAddedHandler}
              disabled={!this.state.controls.placeName.valid} />
          </View>
        </KeyboardAvoidingView>
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