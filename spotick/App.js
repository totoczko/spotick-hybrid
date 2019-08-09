import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail'
import Settings from './src/screens/Settings/Settings'
import UserScreen from './src/screens/User/User';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/configureStore';

const createApp = (Component, ...props) => {
  return class App extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            <Component {...{
              ...this.props,
              ...props,
            }} />
          </PersistGate>
        </Provider>
      );
    }
  }
}

// Register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => createApp(AuthScreen));
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => createApp(SharePlaceScreen));
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => createApp(FindPlaceScreen));
Navigation.registerComponent("awesome-places.PlaceDetailScreen", () => createApp(PlaceDetailScreen));
Navigation.registerComponent("awesome-places.Settings", () => createApp(Settings));
Navigation.registerComponent("awesome-places.UserScreen", () => createApp(UserScreen));

// Start an app
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
})