import React, { Component } from 'react'
import { View, ActivityIndicator, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import validate from '../../utility/validation';
import { startAddPlace } from '../../store/actions/index'

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          validationRules: {
            notEmpty: true
          },
          touched: false
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    })
  }

  componentWillMount() {
    this.reset()
  }

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 })
      // this.props.onStartAddPlace()
    }
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === 'willAppear') {
        this.props.onStartAddPlace()
      }
    }

    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
    this.reset()
    this.imagePicker.reset()
    this.locationPicker.reset()
    // this.props.navigator.switchToTab({ tabIndex: 0 })
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

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }

  render() {
    let submitButton = <Button
      title="Share the place"
      onPress={this.placeAddedHandler}
      disabled={
        !this.state.controls.placeName.valid ||
        !this.state.controls.location.valid ||
        !this.state.controls.image.valid
      } />;

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} ref={ref => (this.imagePicker = ref)} />
          <PickLocation onLocationPicked={this.locationPickedHandler} ref={ref => (this.locationPicker = ref)} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            {submitButton}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
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

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)