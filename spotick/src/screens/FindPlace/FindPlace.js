import React, { Component } from 'react'
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PlaceList from '../../components/PlaceList/PlaceList'
import { getPlaces } from '../../store/actions/index'
import { likePlace } from '../../store/actions/places';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#3f51b5"
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  componentDidMount() {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler()
    })
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === 'willAppear') {
        this.props.onLoadPlaces()
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

  itemSelectedHandler = (key, onLikePressed, userId) => {
    const selPlace = this.props.places.find(place => {
      return place.key === key
    })
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.shortText,
      passProps: {
        selectedPlace: selPlace,
        onLikePressed: onLikePressed,
        userId: userId
      }
    })
  }

  itemLikeHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key
    })
    this.props.onLikePlace(selPlace.id, selPlace.likes)
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  render() {
    return <View style={this.state.placesLoaded ? '' : styles.loadContainer}>
      {this.state.placesLoaded ? (
        <Animated.View style={{
          opacity: this.state.placesAnim
        }}>
          <PlaceList places={this.props.places} userId={this.props.auth.id} onItemSelected={this.itemSelectedHandler} onLikePressed={this.itemLikeHandler} />
        </Animated.View>
      ) : <ActivityIndicator />}
    </View>
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places,
    auth: state.auth
  }
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


const mapDispatchToProps = dispatch => {
  return {
    onLikePlace: (placeId, likes) => dispatch(likePlace(placeId, likes)),
    onLoadPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen)