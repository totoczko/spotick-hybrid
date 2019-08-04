import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'

class UserScreen extends Component {
  render() {
    return (
      <>
        <View style={styles.userHead}>
          <View style={[styles.avatar, { backgroundColor: this.props.user.color }]}><Text style={styles.avatarText}>{this.props.user.username.charAt(0)}</Text></View>
          <View style={styles.userInfo}>
            <View><Text>{this.props.user.username}</Text></View>
            <View><Text>{this.props.user.email}</Text></View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
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
          </View>
        </ScrollView>
      </>
    )
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
  imageContainer: {
    justifyContent: 'center',
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