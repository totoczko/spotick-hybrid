import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import TabsSwitch from '../../components/UI/TabSwitch/TabsSwitch';

class UserScreen extends Component {
  state = {
    activeTab: 0
  }

  handleTabClick = (key) => {
    console.log(key)
    this.setState({
      activeTab: key
    })
  }

  render() {
    const tabItems = ["Moje posty", "Polubione"]

    return (
      <>
        <View style={styles.userHead}>
          <View style={[styles.avatar, { backgroundColor: this.props.user.color }]}><Text style={styles.avatarText}>{this.props.user.username ? this.props.user.username.charAt(0) : ''}</Text></View>
          <View style={styles.userInfo}>
            <View><Text>{this.props.user.username}</Text></View>
            <View><Text>{this.props.user.email}</Text></View>
          </View>
        </View>
        <View>
          <TabsSwitch items={tabItems} active={this.state.activeTab} handleTabClick={this.handleTabClick} />
          <ScrollView>
            {this.state.activeTab === 0 ? (
              <FlatList
                data={["https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455", "https://firebasestorage.googleapis.com/v0/b/awesome-places-247312.appspot.com/o/places%2Ffc72f03a-8221-4759-b6cf-ab0f7257a455.jpg?alt=media&token=fc72f03a-8221-4759-b6cf-ab0f7257a455"]}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Image style={styles.imageThumbnail} source={{ uri: item }} />
                  </View>
                )}
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
            ) : (
                <FlatList
                  data={["https://firebasestorage.googleapis.com/v0/b/spot-pwa.appspot.com/o/images%2F0629b8db-fd33-4307-8b70-79c80c712c9d?alt=media", "https://firebasestorage.googleapis.com/v0/b/spot-pwa.appspot.com/o/images%2F0629b8db-fd33-4307-8b70-79c80c712c9d?alt=media", "https://firebasestorage.googleapis.com/v0/b/spot-pwa.appspot.com/o/images%2F0629b8db-fd33-4307-8b70-79c80c712c9d?alt=media", "https://firebasestorage.googleapis.com/v0/b/spot-pwa.appspot.com/o/images%2F0629b8db-fd33-4307-8b70-79c80c712c9d?alt=media"]}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <Image style={styles.imageThumbnail} source={{ uri: item }} />
                    </View>
                  )}
                  numColumns={2}
                  keyExtractor={(item, index) => index}
                />
              )}
          </ScrollView>
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
    user: state.auth
  }
}

export default connect(mapStateToProps)(UserScreen)