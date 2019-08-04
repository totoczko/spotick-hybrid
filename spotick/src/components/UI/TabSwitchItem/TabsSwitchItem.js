import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native'

const TabsSwitchItem = (props) => {
  const content = (
    <View style={[styles.switchItem, props.active ? { borderBottomColor: '#FF0266' } : { borderBottomColor: '#FFF' }]}>
      <Text style={[{ textTransform: "uppercase", fontWeight: "bold", textAlign: "center" }]}>{props.children}</Text>
    </View >
  )

  if (Platform.OS = 'android') {
    return <TouchableNativeFeedback onPress={() => props.onPress(props.id)}>
      {content}
    </TouchableNativeFeedback>
  }
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
  switchItem: {
    padding: 15,
    margin: 0,
    backgroundColor: "#fff",
    width: "50%",
    borderTopWidth: 0,
    borderBottomWidth: 2
  }
})

export default TabsSwitchItem
