import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-home" : "ios-home", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-add" : "ios-add", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-person" : "ios-person", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlaceScreen",
          title: "Mainsite",
          icon: sources[0],
          showLabel: false,
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "awesome-places.SharePlaceScreen",
          title: "Add post",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "awesome-places.UserScreen",
          title: "Profile",
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[3],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "#212985" //ios

      },
      appStyle: {
        tabBarSelectedButtonColor: "#212985" //android
      },
      drawer: {
        left: {
          screen: "awesome-places.SideDrawer"
        }
      }
    });
  });
};

export default startTabs;