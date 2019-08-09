import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-home" : "ios-home", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-add" : "ios-add", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-person" : "ios-person", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-settings" : "ios-settings", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlaceScreen",
          title: "Spotick",
          icon: sources[0],
          showLabel: false
        },
        {
          screen: "awesome-places.SharePlaceScreen",
          title: "Dodaj post",
          icon: sources[1]
        },
        {
          screen: "awesome-places.UserScreen",
          title: "Profil",
          icon: sources[2],
          navigatorButtons: {
            rightButtons: [
              {
                icon: sources[4],
                title: "Ustawienia",
                id: "settingsToggle"
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
        right: {
          screen: "awesome-places.Settings"
        }
      }
    });
  });
};

export default startTabs;