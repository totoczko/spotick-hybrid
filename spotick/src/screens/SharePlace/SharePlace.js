import React, { Component } from 'react'
import { View, ActivityIndicator, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import validate from '../../utility/validation';
import { startAddPlace } from '../../store/actions/index'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#3f51b5"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  reset = () => {
    this.setState({
      controls: {
        placeText: {
          value: "",
          valid: false,
          placeholder: "Wpisz opis",
          validationRules: {
            notEmpty: true
          },
          touched: false
        },
        location: {
          value: null,
          valid: false,
          placeholder: "Wpisz miasto",
          validationRules: {
            notEmpty: true
          },
          touched: false
        },
        img: {
          value: null,
          valid: false
        },
        user: {
          color: '',
          id: '',
          name: ''
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

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCity(position.coords.latitude, position.coords.longitude)
            .then(city => {
              this.setState(prevState => {
                return {
                  controls: {
                    ...prevState.controls,
                    location: {
                      value: city,
                      valid: true
                    }
                  }
                }
              })
            })
        },
        (err) => {
          console.log(err);
        }
      )
    }

    this.setState(prevState => {
      return {
        ...prevState,
        user: {
          color: this.props.user.color,
          id: this.props.user.id,
          name: this.props.user.username
        }
      }
    })
  }

  getCity(lat, long) {
    return fetch("https://us1.locationiq.com/v1/reverse.php?key=&lat=" + lat + "&lon=" + long + "&format=json", {
      "async": true,
      "crossDomain": true,
      "method": "GET"
    }).then(res => res.json()).then(res => {
      return res.address.city || res.address.town;
    })
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === 'willAppear') {
        this.props.onStartAddPlace()
      }
    }
  }

  placeAddedHandler = () => {
    const date = new Date().getTime();
    this.props.onAddPlace(
      this.state.controls.placeText.value,
      this.state.controls.location.value,
      this.state.controls.img.value,
      date,
      this.state.user
    );
    this.reset()
    this.imagePicker.reset()
    // this.props.navigator.switchToTab({ tabIndex: 0 })
  }

  placeTextChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeText: {
            ...prevState.controls.placeText,
            value: val,
            touched: true,
            valid: validate(val, prevState.controls.placeText.validationRules)
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
            ...prevState.controls.location,
            value: location,
            touched: true,
            valid: validate(location, prevState.controls.location.validationRules)
          }
        }
      }
    })
  }

  imagePickedHandler = img => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          img: {
            value: img,
            valid: true
          }
        }
      }
    })
  }

  render() {
    let submitButton = <ButtonWithBackground
      onPress={this.placeAddedHandler}
      color="#3f51b5"
      textColor="#fff"
      disabled={
        !this.state.controls.placeText.valid ||
        !this.state.controls.location.valid ||
        !this.state.controls.img.valid
      }>Opublikuj</ButtonWithBackground>;

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <PickImage onImagePicked={this.imagePickedHandler} ref={ref => (this.imagePicker = ref)} />
          <PlaceInput
            placeData={this.state.controls.location}
            onChangeText={this.locationPickedHandler}
            placeholder={"Wpisz lokalizację"}
          />
          <PlaceInput
            placeData={this.state.controls.placeText}
            onChangeText={this.placeTextChangedHandler}
            placeholder={"Wpisz podpis"}
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
    onAddPlace: (placeText, location, img, date, user) => dispatch(addPlace(placeText, location, img, date, user)),
    onStartAddPlace: () => dispatch(startAddPlace())
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded,
    user: state.auth
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 8,
    width: "100%"
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)
