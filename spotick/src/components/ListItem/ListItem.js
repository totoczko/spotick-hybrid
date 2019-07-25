import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'


// TouchableNativeFeedback only on Android!
const ListItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onItemPressed}>
      <View style={styles.listItem} >
        <View style={styles.listItemHead}>
          <View style={styles.avatar}><Text style={styles.avatarText}>P</Text></View>
          <View style={styles.listItemInfo}>
            <View><Text>lolo</Text></View>
            <View><Text>13 maja</Text></View>
          </View>
        </View>
        <Image source={props.placeImage} style={styles.placeImage} />
        {/* resizeMode="cover"  is default */}
        <View style={styles.listItemBottom}>
          <View style={styles.bottomLeft}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                size={16}
                name={Platform.OS === "android" ? "md-pin" : "ios-pin"}
                color="#999"
                style={{ marginRight: 5 }}
              />
              <Text>{props.placeName}</Text>
            </View>
            <Text>{props.placeName}</Text>
          </View>
          <View style={styles.bottomRight}>
            <Icon
              size={30}
              name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
              color="#999"
              style={{ marginRight: 5 }}
            />
            <Text>5</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  listItemHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15
  },
  avatar: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  avatarText: {
    color: "#fff"
  },
  listItemInfo: {
    flex: 1
  },
  listItem: {
    width: "100%",
    marginBottom: 5,
    flexDirection: "column",
    alignItems: "center"
  },
  placeImage: {
    marginRight: 8,
    height: 350,
    width: "100%"
  },
  listItemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  bottomLeft: {
    flex: 1
  },
  bottomRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
})

export default ListItem
