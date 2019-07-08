import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'


export default class SideDrawer extends Component {
  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]} >
        <Text>side drawer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  }
})