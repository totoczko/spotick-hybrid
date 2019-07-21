// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @PlaceInputat
//  * @flow
//  */

// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import PlaceInput from './src/components/PlaceInput/PlaceInput'
// import PlaceList from './src/components/PlaceList/PlaceList';
// // import placeImage from './src/assets/lagoon.jpg'
// import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'
// import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'


import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail'
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import configureStore from './src/store/configureStore'

const store = configureStore()

// Register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer, store, Provider);

// Start an app
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
})

// class App extends Component {
//   // state = {
//   //   places: [],
//   //   selectedPlace: null
//   // }

//   placeAddedHandler = placeName => {
//     this.props.onAddPlace(placeName)
//     // this.setState(prevState => {
//     //   return {
//     //     places: prevState.places.concat({
//     //       key: Math.random(),
//     //       name: placeName,
//     //       // image: placeImage,
//     //       image: {
//     //         uri: "https://139992-434456-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/03/Fiji-Travel-Network-Blue-Lagoon-Beachfront2.jpg"
//     //       }
//     //     })
//     //   }
//     // })
//   }

//   placeSelectedHandler = key => {
//     this.props.onSelectPlace(key)
//     // this.setState(prevState => {
//     //   return {
//     //     selectedPlace: prevState.places.find(place => {
//     //       return place.key === key;
//     //     })
//     //   }
//     // })
//   }

//   onItemDeletedHandler = () => {
//     this.props.onDeletePlace()
//     // this.setState(prevState => {
//     //   return {
//     //     places: prevState.places.filter(place => {
//     //       return place.key !== prevState.selectedPlace.key;
//     //     }),
//     //     selectedPlace: null
//     //   }
//     // })
//   }

//   onModalClosedHandler = () => {
//     this.props.onDeselectPlace()
//     // this.setState({
//     //   selectedPlace: null
//     // })
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           selectedPlace={this.props.selectedPlace}
//           onItemDeleted={this.onItemDeletedHandler}
//           onModalClosed={this.onModalClosedHandler}
//         />
//         <PlaceInput onPlaceAdded={this.placeAddedHandler} />
//         <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 26,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//   },
// });

// const mapStateToProps = state => {
//   return {
//     places: state.places.places,
//     selectedPlace: state.places.selectedPlace
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (name) => dispatch(addPlace(name)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     onSelectPlace: (key) => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deselectPlace())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)