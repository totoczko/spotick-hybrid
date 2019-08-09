import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, FlatList, Image, Animated, ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import TabsSwitch from '../../components/UI/TabSwitch/TabsSwitch';
import { getPlaces } from '../../store/actions/index'
import { likePlace } from '../../store/actions/places';

class UserScreen extends Component {
  state = {
    activeTab: 0,
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  handleTabClick = (key) => {
    this.setState({
      activeTab: key
    })
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
      let mymap = this.props.places.filter((item) => {
        return item.user.id === this.props.user.id;
      });
    })
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === 'willAppear') {
        this.props.onLoadPlaces()
      }
    }

    if (event.type === "NavBarButtonPress") {
      if (event.id === "settingsToggle") {
        this.props.navigator.toggleDrawer({
          side: "right"
        })
      }
    }
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }


  itemSelectedHandler = (key, onLikePressed, userId) => {
    const selPlace = this.props.places.find(place => {
      return place.key === key
    })
    const deletingEnabled = userId === selPlace.user.id
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.shortText,
      passProps: {
        selectedPlace: selPlace,
        onLikePressed: onLikePressed,
        userId: userId,
        deletingEnabled: deletingEnabled
      }
    })
  }

  itemLikeHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key
    })
    this.props.onLikePlace(selPlace.id, selPlace.likes)
  }

  render() {
    const tabItems = ["Moje posty", "Polubione"]
    const userPlaces = (places, userId) => {
      let list = []
      places.map((place) => {
        userId === place.user.id ? list.push(place) : null
      })
      return list
    }
    const userLikes = (places, userId) => {
      let list = []
      places.map((place) => {
        place.likes.users && place.likes.users.indexOf(userId) >= 0 ? list.push(place) : null
      })
      return list
    }
    return (
      <>
        <View style={styles.userHead}>
          <View style={[styles.avatar, { backgroundColor: this.props.user.color }]}><Text style={styles.avatarText}>{this.props.user.username ? this.props.user.username.charAt(0) : ''}</Text></View>
          <View style={styles.userInfo}>
            <View><Text>{this.props.user.username}</Text></View>
            <View><Text>{this.props.user.email}</Text></View>
          </View>
        </View>
        <TabsSwitch items={tabItems} active={this.state.activeTab} handleTabClick={this.handleTabClick} />
        <View>
          {this.state.placesLoaded ? (
            <Animated.View style={{
              opacity: this.state.placesAnim
            }}>
              <ScrollView>
                {this.state.activeTab === 0 ? (
                  <FlatList
                    data={userPlaces(this.props.places, this.props.user.id)}
                    renderItem={({ item }) => (
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <TouchableNativeFeedback onPress={() => this.itemSelectedHandler(item.key, this.itemLikeHandler, this.props.user.id)}>
                          <Image style={styles.imageThumbnail} source={item.img} />
                        </TouchableNativeFeedback>
                      </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                  />
                ) : (
                    <FlatList
                      data={userLikes(this.props.places, this.props.user.id)}
                      renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          <TouchableNativeFeedback onPress={() => this.itemSelectedHandler(item.key, this.itemLikeHandler, this.props.user.id)}>
                            <Image style={styles.imageThumbnail} source={item.img} />
                          </TouchableNativeFeedback>
                        </View>
                      )}
                      numColumns={2}
                      keyExtractor={(item, index) => index}
                    />
                  )}
              </ScrollView>
            </Animated.View>
          ) : <ActivityIndicator />}
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  userHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  avatarText: {
    color: "#fff",
    textTransform: "uppercase"
  },
  userInfo: {
    flex: 1
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth,
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces()),
    onLikePlace: (placeId, likes) => dispatch(likePlace(placeId, likes))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)