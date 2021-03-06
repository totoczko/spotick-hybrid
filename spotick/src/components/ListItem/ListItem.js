import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'
import { formatData } from '../../utility/formatData';
import MenuModal from '../MenuModal/MenuModal';

// TouchableNativeFeedback only on Android!
const ListItem = (props) => {
  return (
    <View style={styles.listItem} >
      <View style={styles.listItemHead}>
        <View style={[styles.avatar, { backgroundColor: props.placeUser.color }]}><Text style={styles.avatarText}>{props.placeUser.name ? props.placeUser.name.charAt(0) : ''}</Text></View>
        <View style={styles.listItemInfo}>
          <View><Text>{props.placeUser.name}</Text></View>
          <View><Text>{formatData(props.placeDate)}</Text></View>
        </View>
        {props.deleting ? (
          <MenuModal deleteHandler={props.deleteHandler} />
        ) : null}
      </View>
      <Image source={props.placeImage} style={styles.placeImage} />
      <View style={styles.listItemBottom}>
        <View style={styles.bottomLeft}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              size={16}
              name={Platform.OS === "android" ? "md-pin" : "ios-pin"}
              color="#999"
              style={{ marginRight: 5 }}
            />
            <Text>{props.placeLocation}</Text>
          </View>
          <Text>{props.placeText}</Text>
        </View>
        <View style={styles.bottomRight}>
          <TouchableNativeFeedback onPress={props.onLikePressed}>
            <Icon
              size={30}
              name={Platform.OS === "android" ? "md-heart" : "ios-heart"}
              color={props.placeLikes.users && props.placeLikes.users.indexOf(props.userId) >= 0 ? "red" : "#999"}
              style={{ marginRight: 5 }}
            />
          </TouchableNativeFeedback>
          <Text>{props.placeLikes.count}</Text>
        </View>
      </View>
    </View>

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
